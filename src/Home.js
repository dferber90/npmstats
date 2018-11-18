import { h, Component } from "preact";
import { route } from "preact-router";
import { Container } from "./Container";
import { SearchBox } from "./SearchBox";
import { Footer } from "./Footer";
import {
  userInputToCommonFormat,
  commonFormatToUrlSlice
} from "./conversions.js";
import logo from "../assets/logo2.svg";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export class Home extends Component {
  state = {
    searchText: "",
    isFetching: false
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
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
      <div>
        <Container fullHeight>
          <div class="landing">
            <img src={logo} alt="logo" />
            <h1 class="logo">
              NPM<span>STATS</span>
            </h1>
            <h2>show download statistics of any npm module</h2>
            <SearchBox
              onSubmit={this.handleSubmit}
              value={this.state.searchText}
              onInput={event => {
                this.setState({ searchText: event.target.value });
              }}
            />
          </div>
        </Container>
      </div>
    );
  }
}
