import { h, Component } from "preact";
import { route } from "preact-router";
import { Container } from "./Container";
import { SearchBox } from "./SearchBox";
import {
  userInputToCommonFormat,
  commonFormatToUrlSlice
} from "./conversions.js";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export class Home extends Component {
  state = {
    searchText: "",
    isFetching: false
  };
  handleSubmit = event => {
    event.preventDefault();
    const commonFormat = userInputToCommonFormat(this.state.searchText);
    if (commonFormat.length > 0) {
      route(`/${commonFormatToUrlSlice(commonFormat)}`);
    }
    return false;
  };
  render() {
    return (
      <Container>
        <div class="landing">
          <SearchBox
            onSubmit={this.handleSubmit}
            value={this.state.searchText}
            onInput={event => {
              this.setState({ searchText: event.target.value });
            }}
          />
          <div class="more">wow</div>
        </div>
      </Container>
    );
  }
}
