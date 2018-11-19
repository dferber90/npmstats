import { h, Component } from "preact";
import memoize from "memoize-one";
// import { DailyChart } from "./DailyChart.js";
import { MonthlyChart } from "./MonthlyChart.js";
// import { YearlyChart } from "./YearlyChart.js";
import { DownloadBox } from "./DownloadBox.js";
import { LoadingSpinner } from "./LoadingSpinner";

const combinePackageDownloads = packages =>
  packages.reduce((acc, pkg) => {
    if (!pkg.downloads) return;
    Object.entries(pkg.downloads).forEach(([day, dls]) => {
      if (!acc[day]) acc[day] = 0;
      acc[day] += dls;
    });
    return acc;
  }, {});

// memoize to avoid chart from reinitializing with the same data, because
// charts use an equality check on props.data with prevProps.data.
const authorDataToData = memoize(authors => {
  return authors.map(author => ({
    name: author.author,
    downloads: combinePackageDownloads(author.packages)
  }));
});

export class AuthorStats extends Component {
  componentDidMount() {
    this.props.loadAuthorsStats({
      commonFormat: this.props.authors
    });
  }
  componentDidUpdate() {
    this.props.loadAuthorsStats({
      commonFormat: this.props.authors
    });
  }
  render() {
    if (!this.props.data) return <LoadingSpinner />;
    const firstMissingAuthor = this.props.data.find(
      author => author.packages && author.packages.length === 0
    );
    if (firstMissingAuthor) {
      return (
        <div class="not-found">
          Author &quot;<i>{firstMissingAuthor.author}</i>&quot; does not exist
          or has not authored any packages.
        </div>
      );
    }

    const firstFailedPackageAuthor = this.props.data.find(author => {
      return author.packages.some(pkg => pkg.failedToFetch);
    });
    if (firstFailedPackageAuthor)
      return (
        <div class="not-found">
          Failed to fetch at least one package of &quot;
          <i>{firstFailedPackageAuthor.author}</i>&quot;.
        </div>
      );

    return (
      <div class="stats">
        {/*<div class="chart">
          <DailyChart data={authorDataToData(this.props.data)} />
        </div>*/}
        <div class="chart">
          <MonthlyChart data={authorDataToData(this.props.data)} />
        </div>
        {/*
        <div class="chart">
          <YearlyChart data={authorDataToData(this.props.data)} />
        </div>*/}
        <div class="chart">
          <DownloadBox data={this.props.data} />
        </div>
      </div>
    );
  }
}
