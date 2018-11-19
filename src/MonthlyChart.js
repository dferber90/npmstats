import { h, Component } from "preact";
import Chart from "chart.js";
import chartOptions from "./chartOptions.js";
import { colors } from "./colors.js";

const getDownloadsByMonth = data =>
  data.map(entry => ({
    label: entry.name,
    downloads: Object.entries(
      Object.entries(entry.downloads).reduce((acc, [day, dls]) => {
        const month = day.substring(0, 7);
        if (!acc[month]) acc[month] = 0;
        acc[month] += dls;
        return acc;
      }, {})
    ).map(([month, downloads]) => ({ month, downloads }))
  }));

const getLabels = downloadsByMonth =>
  downloadsByMonth[0].downloads.map(entry =>
    new Date(entry.month).toLocaleDateString("en", {
      year: "2-digit",
      month: "short"
    })
  );

const getDatasets = downloadsByMonth =>
  downloadsByMonth.map((item, index) => ({
    label: item.label,
    data: item.downloads.map(entry => entry.downloads),
    backgroundColor: "transparent",
    borderColor: colors[index % colors.length],
    borderWidth: 1
  }));

const getOptions = data => ({
  ...chartOptions,
  legend: {
    display: data.length > 1,
    position: "bottom"
  },
  title: {
    display: true,
    text: `Downloads per month`
  }
});

export class MonthlyChart extends Component {
  chartRef = null;
  chartInstance = null;
  componentDidMount() {
    const downloadsByMonth = getDownloadsByMonth(this.props.data);

    this.chartInstance = new Chart(this.chartRef, {
      type: "line",
      data: {
        labels: getLabels(downloadsByMonth),
        datasets: getDatasets(downloadsByMonth)
      },
      options: getOptions(this.props.data)
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const downloadsByMonth = getDownloadsByMonth(this.props.data);
      this.chartInstance.data.labels = getLabels(downloadsByMonth);
      this.chartInstance.data.datasets = getDatasets(downloadsByMonth);
      this.chartInstance.options = getOptions(this.props.data);
      this.chartInstance.update();
    }
  }
  componentWillUnmount() {
    this.chartInstance.destroy();
  }
  render() {
    return (
      <canvas ref={node => (this.chartRef = node)} width="400" height="250" />
    );
  }
}
