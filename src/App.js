import { h, Component } from "preact";
import Router from "preact-router";
import { deepEqual } from "fast-equals";
import { Stats } from "./Stats";
import { Home } from "./Home.js";
import { commonFormatToUrlSlice } from "./conversions.js";
import { isScopedPkg, isAuthor, isRegularPkg, toString } from "./utils";

const fetchPackage = packageName => {
  const url = `https://api.npmjs.org/downloads/range/last-year/${packageName}`;
  return fetchResonse(url).then(response =>
    response.status === 200
      ? {
          name: response.body.package,
          downloads: response.body.downloads
        }
      : { name: toString(item.name), downloads: null }
  );
};

const fetchPackages = options => {
  return Promise.all(
    // NOTE we are currently not batching requests, but we could
    // batch requests to regular pkgs. It is not supported for scoped pkgs
    // however - so we would need to split the requests.
    options.commonFormat.map(item => {
      const packageName = commonFormatToUrlSlice([item], "/");
      return fetchPackage(packageName);
    })
  );
};

const fetchAuthors = options => {
  return Promise.all(
    options.commonFormat.map(searchItem => {
      // remove leading @ from author
      const author = searchItem.author.slice(1);
      return fetch(
        `http://localhost:3000/author/${encodeURIComponent(author)}`
      ).then(response => response.json());
    })
  ).then(authorsWithPackages => {
    return Promise.all(
      authorsWithPackages.map(authorWithPackages => {
        // promise for this author
        return new Promise(resolve => {
          const packages = Promise.all(
            authorWithPackages.packages.map(pkg => fetchPackage(pkg))
          ).then(pkgs => {
            resolve({
              author: authorWithPackages.author,
              packages: pkgs
            });
          });
        });
      })
    );
  });
};

const fetchResonse = (url, ...rest) =>
  fetch(url, ...rest)
    .then(response => Promise.all([response.status, response.json()]))
    .then(([status, body]) => ({ status, body }));

export class App extends Component {
  state = {
    options: null,
    data: null
  };
  promise = null;

  loadStats = (loadFn, options) => {
    if (deepEqual(this.state.options, options)) return this.promise;

    this.promise = loadFn(options).then(data => {
      this.setState({ options, data });
    });
    return this.promise;
  };

  loadPackageStats = options => this.loadStats(fetchPackages, options);
  loadAuthorsStats = options => this.loadStats(fetchAuthors, options);

  render() {
    return (
      <Router>
        <Home path="/" load={this.load} />
        <Stats
          path="/:searchQuery"
          loadPackageStats={this.loadPackageStats}
          loadAuthorsStats={this.loadAuthorsStats}
          data={this.state.data}
        />
      </Router>
    );
  }
}
