import { h, Component } from "preact";

export class SearchBox extends Component {
  state = {
    isOpen: false
  };
  handleSubmit = event => {
    this.setState({ isOpen: false });
    this.props.onSubmit(event);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} class="searchBox">
        <input
          autofocus
          type="text"
          class="searchText"
          disabled={this.props.disabled}
          placeholder="Find a package"
          value={this.props.value}
          onInput={this.props.onInput}
        />
        <div class="searchTabs">
          <button
            type="button"
            onClick={() =>
              this.setState(prevState => ({
                isOpen: !prevState.isOpen
              }))
            }
          >
            {this.state.isOpen ? "Hide Options" : "Options"}
          </button>
          <div class="searchSpacer" />
          <button type="submit" className="searchButton">
            Search
          </button>
        </div>
        <div
          class="searchSettings"
          style={{ display: this.state.isOpen ? "" : "none" }}
        >
          <h2>Range</h2>
          <fieldset>
            <div>
              <input type="radio" id="last-year" value="last-year" />
              <label htmlFor="last-year"> Last year</label>
            </div>
            <div>
              <input type="radio" id="last-month" value="last-month" />
              <label htmlFor="last-month"> Last month</label>
            </div>
            <div>
              <input type="radio" id="custom-range" value="custom-range" />
              <label htmlFor="custom-range"> Custom Range</label>
            </div>
          </fieldset>
          <h2>Tips</h2>
          <ul>
            <li>
              <code>jest, enzyme</code> searches for multiple packages using
            </li>
            <li>
              <code>@dferber90</code> searches for an author
            </li>
            <li>
              <code>@babel/core</code> searches for a scoped package
            </li>
          </ul>
          <option />
          <p class="searchInfo">
            The earliest date for which data will be returned is January 10,
            2015.{" "}
            <a
              href="https://blog.npmjs.org/post/92574016600/numeric-precision-matters-how-npm-download-counts"
              target="_blank"
            >
              Learn more
            </a>{" "}
            about how npm download counts work. These statistics are not
            provided in real-time. All numbers will change at most once per day.
          </p>
        </div>
      </form>
    );
  }
}
