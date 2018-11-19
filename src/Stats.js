import { h, Component } from "preact";
import { route } from "preact-router";
import { SearchBox } from "./SearchBox";
import { PackageStats } from "./PackageStats.js";
import { Container } from "./Container";
import { AuthorStats } from "./AuthorStats.js";

import {
  commonFormatToUrlSlice,
  urlSliceToCommonFormat,
  commonFormatToUserInput,
  userInputToCommonFormat
} from "./conversions.js";
import { isScopedPkg, isAuthor, isRegularPkg } from "./utils";

const getSearchTextFromSearchQuery = searchQuery =>
  commonFormatToUserInput(urlSliceToCommonFormat(searchQuery));

export class Stats extends Component {
  state = {
    searchQuery: this.props.searchQuery,
    searchText: getSearchTextFromSearchQuery(this.props.searchQuery)
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      window.scrollTo(0, 0);
    }
  }
  static getDerivedStateFromProps(props, state) {
    return props.searchQuery !== state.searchQuery
      ? {
          searchQuery: props.searchQuery,
          searchText: getSearchTextFromSearchQuery(props.searchQuery)
        }
      : null;
  }
  handleSubmit = event => {
    event.preventDefault();
    const commonFormat = userInputToCommonFormat(this.state.searchText);
    if (commonFormat.length > 0)
      route(`/${commonFormatToUrlSlice(commonFormat)}`);
    return false;
  };
  render() {
    const commonFormat = urlSliceToCommonFormat(this.props.searchQuery);
    const scopedPackages = commonFormat.filter(isScopedPkg);
    const regularPackages = commonFormat.filter(isRegularPkg);
    const authors = commonFormat.filter(isAuthor);

    return (
      <Container fullHeight>
        <div class="home">
          <a href="/" class="logo">
            NPM<span>STATS</span>
          </a>
        </div>

        <SearchBox
          value={this.state.searchText}
          onInput={event => {
            this.setState({ searchText: event.target.value });
          }}
          onSubmit={this.handleSubmit}
        />
        <div>
          {(() => {
            if (
              authors.length &&
              (regularPackages.length || scopedPackages.length)
            ) {
              return (
                <div class="not-found">
                  You tried to search for packages and users at the same time.
                  You can only search for one type.
                </div>
              );
            }

            if (authors.length)
              return (
                <AuthorStats
                  data={this.props.authorsStats}
                  authors={urlSliceToCommonFormat(this.props.searchQuery)}
                  loadAuthorsStats={this.props.loadAuthorsStats}
                />
              );
            return (
              <PackageStats
                data={this.props.packagesStats}
                packages={urlSliceToCommonFormat(this.props.searchQuery)}
                loadPackagesStats={this.props.loadPackagesStats}
              />
            );
          })()}
        </div>
      </Container>
    );
  }
}
