import { h, render, Component } from "preact";
import { Footer } from "./Footer.js";
import { DailyChart } from "./DailyChart.js";
import { MonthlyChart } from "./MonthlyChart.js";
import { YearlyChart } from "./YearlyChart.js";

export class Stats extends Component {
  componentDidMount() {
    const pkg = this.props.pkgaut;
    const url = `https://api.npmjs.org/downloads/range/last-year/${pkg}`;
    this.props.load(url);
  }
  state = {
    searchText: ""
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
      <div class="container">
        <div id="results">
          <a href="/">home</a>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="main-search-text"
              className="searchText"
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
          <h1>stats for {this.props.pkgaut}</h1>
          {(() => {
            if (!this.props.response) return "Loading..";
            if (this.props.response.error) return this.props.response.error;
            return (
              <div id="stats">
                <div class="chart">
                  <DailyChart downloads={this.props.response.downloads} />
                </div>
                <div class="chart">
                  <MonthlyChart downloads={this.props.response.downloads} />
                </div>
                <div class="chart">
                  <YearlyChart downloads={this.props.response.downloads} />
                </div>
              </div>
            );
          })()}
          <Footer />
        </div>
      </div>
    );
  }
}
