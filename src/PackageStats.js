import { h, Component } from "preact";
import memoize from "memoize-one";
import { DailyChart } from "./DailyChart.js";
import { MonthlyChart } from "./MonthlyChart.js";
import { YearlyChart } from "./YearlyChart.js";
import { DownloadBox } from "./DownloadBox.js";
import { LoadingSpinner } from "./LoadingSpinner";

// memoize to avoid chart from reinitializing with the same data, because
// charts use an equality check on props.data with prevProps.data
const addPackage = memoize(data => [{ packages: data }]);

export class PackageStats extends Component {
  componentDidMount() {
    this.props.loadPackagesStats({
      commonFormat: this.props.packages
    });
  }
  componentDidUpdate() {
    this.props.loadPackagesStats({
      commonFormat: this.props.packages
    });
  }
  render() {
    if (!this.props.data) return <LoadingSpinner />;
    const firstMissingPackage = this.props.data.find(
      pkg => pkg.downloads === null
    );
    if (firstMissingPackage) {
      return (
        <div class="not-found">
          Could not find package &quot;<i>{firstMissingPackage.name}</i>&quot;
        </div>
      );
    }
    return (
      <div id="stats">
        {/*
        <div class="chart">
          <DailyChart data={this.props.data} />
        </div>*/}
        <div class="chart">
          <MonthlyChart data={this.props.data} />
        </div>
        {/*
        <div class="chart">
          <YearlyChart data={this.props.data} />
        </div>
        */}
        <div>
          <DownloadBox data={addPackage(this.props.data)} />
        </div>
      </div>
    );
  }
}
