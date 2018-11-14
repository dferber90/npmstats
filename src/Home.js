import { h, render, Component } from "preact";
import { route } from "preact-router";
import { Container } from "./Container";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// const encodeSearchText = searchText =>
//   searchText.startsWith("@")
//     ? `@${encodeURIComponent(searchText.slice(1))}`
//     : encodeURIComponent(searchText);

export class Home extends Component {
  state = {
    searchText: "",
    isFetching: false
  };
  handleSubmit = event => {
    event.preventDefault();
    const pkg = this.state.searchText.trim();
    if (pkg.length > 0) {
      const url = `https://api.npmjs.org/downloads/range/last-year/${pkg}`;
      Promise.race([delay(350), this.props.load(url)]).then(() => {
        this.setState({ isFetching: true });
        route(`/${pkg}`);
      });
    }
    return false;
  };
  render() {
    return (
      <Container>
        <div id="landing">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="main-search-text"
              className="searchText"
              disabled={this.state.isFetching}
              placeholder="Find a package"
              value={this.state.searchText}
              onInput={event => {
                this.setState({ searchText: event.target.value });
              }}
            />
            <button type="submit" className="submitButton">
              Search
            </button>
          </form>
        </div>
      </Container>
    );
  }
}
