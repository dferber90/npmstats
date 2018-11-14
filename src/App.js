import { h, Component } from "preact";
import Router from "preact-router";
import { Stats } from "./Stats";
import { Home } from "./Home.js";
import fakeResponse from "./response.js";

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const fetchResonse = url => {
  console.log("fetching", url);
  return delay(1500).then(() => fakeResponse);
};

export class App extends Component {
  state = {
    url: null,
    response: null
  };
  promise = null;
  controller = null;
  load = url => {
    if (this.state.url === url) return this.promise;
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }

    this.controller = new AbortController();
    this.setState({ url, response: null });
    this.promise = fetchResonse(url, { signal: this.controller.signal }).then(
      response => {
        this.setState({ url, response });
      },
      () => {
        this.setState({ url, response: { error: "Failed to fetch" } });
      }
    );
    return this.promise;
  };
  render() {
    return (
      <Router>
        <Home path="/" load={this.load} response={this.state.response} />
        <Stats
          path="/:pkgaut"
          load={this.load}
          response={this.state.response}
        />
      </Router>
    );
  }
}
