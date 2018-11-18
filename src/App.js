import { h, Component } from "preact";
import Router from "preact-router";
import { deepEqual } from "fast-equals";
import { Stats } from "./Stats";
import { Home } from "./Home.js";
import { Footer } from "./Footer.js";
import { commonFormatToUrlSlice } from "./conversions.js";

const fetchPackage = packageName => {
  const url = `https://api.npmjs.org/downloads/range/last-year/${packageName}`;
  return fetchResonse(url).then(response =>
    response.status === 200
      ? {
          name: response.body.package,
          downloads: response.body.downloads
        }
      : { name: packageName, downloads: null }
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
    packages: {
      options: null,
      data: null
    },
    authors: {
      options: null,
      data: null
    }
  };
  packagesPromise = null;
  authorsPromise = null;
  promise = null;

  loadPackagesStats = options => {
    if (deepEqual(this.state.packages.options, options))
      return this.packagesPromise;

    this.packagesPromise = fetchPackages(options).then(data => {
      this.setState({ packages: { options, data } });
    });
    return this.packagesPromise;
  };

  loadAuthorsStats = options => {
    if (deepEqual(this.state.authors.options, options))
      return this.authorsPromise;

    this.authorsPromise = fetchAuthors(options).then(data => {
      this.setState({ authors: { options, data } });
    });
    return this.authorsPromise;
  };

  render() {
    return (
      <div>
        <Router>
          <Home path="/" load={this.load} />
          <Stats
            path="/:searchQuery"
            loadPackagesStats={this.loadPackagesStats}
            loadAuthorsStats={this.loadAuthorsStats}
            packagesStats={this.state.packages.data}
            authorsStats={this.state.authors.data}
          />
        </Router>
        <Footer />
      </div>
    );
  }
}
