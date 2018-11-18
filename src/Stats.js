import { h, Component } from "preact";
import { route } from "preact-router";
import { SearchBox } from "./SearchBox";
import { Footer } from "./Footer.js";
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

export class Stats extends Component {
  state = {
    searchText: commonFormatToUserInput(
      urlSliceToCommonFormat(this.props.searchQuery)
    )
  };
  componentDidMount() {
    window.scrollTo(0, 0);
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
        <div id="results">
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
                return "Supplied mixed content";
              }

              if (authors.length)
                return (
                  <AuthorStats
                    data={this.props.data}
                    authors={urlSliceToCommonFormat(this.props.searchQuery)}
                    loadAuthorsStats={this.props.loadAuthorsStats}
                  />
                );
              return (
                <PackageStats
                  data={this.props.data}
                  packages={urlSliceToCommonFormat(this.props.searchQuery)}
                  loadPackageStats={this.props.loadPackageStats}
                />
              );
            })()}
          </div>
        </div>
      </Container>
    );
  }
}
