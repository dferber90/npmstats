import { h, Component } from "preact";

export class SearchBox extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit} class="searchBox">
        <input
          autofocus
          type="text"
          class="searchText"
          disabled={this.props.disabled}
          placeholder="Find a package"
          value={this.props.value}
          onInput={this.props.onInput}
        />
        <button type="submit" className="searchButton">
          Search
        </button>
      </form>
    );
  }
}
