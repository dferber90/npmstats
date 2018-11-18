import { h, Component } from "preact";

export class LoadingSpinner extends Component {
  state = {
    visible: false
  };
  timer = null;
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ visible: true });
    }, 500);
  }
  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }
  render() {
    if (!this.state.visible) return null;
    return (
      <div class="loading-spinner">
        <div class="lds-ripple">
          <div />
          <div />
        </div>
      </div>
    );
  }
}
