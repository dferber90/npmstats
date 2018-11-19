import { h, Component } from "preact";
import Chart from "chart.js";
import { colors, bgColors } from "./colors.js";
import chartOptions from "./chartOptions.js";

const getDownloadsByYear = data =>
  data.map(entry => ({
    label: entry.name,
    downloads: Object.entries(
      Object.entries(entry.downloads).reduce((acc, [day, dls]) => {
        const year = day.substring(0, 4);
        if (!acc[year]) acc[year] = 0;
        acc[year] += dls;
        return acc;
      }, {})
    ).map(([year, downloads]) => ({ year, downloads }))
  }));

const getLabels = downloadsByYear =>
  downloadsByYear[0].downloads.map(entry => entry.year);

const getOptions = data => ({
  ...chartOptions,
  legend: {
    display: data.length > 1,
    position: "bottom"
  },
  title: {
    display: true,
    text: `Downloads per year`
  }
});

const getDatasets = downloadsByYear =>
  downloadsByYear.map((item, index) => ({
    label: item.label,
    data: item.downloads.map(entry => entry.downloads),
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length],
    borderWidth: 1
  }));

export class YearlyChart extends Component {
  chartRef = null;
  chartInstance = null;
  componentDidMount() {
    const downloadsByYear = getDownloadsByYear(this.props.data);

    this.chartInstance = new Chart(this.chartRef, {
      type: "bar",
      data: {
        labels: getLabels(downloadsByYear),
        datasets: getDatasets(downloadsByYear)
      },
      options: getOptions(this.props.data)
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const downloadsByYear = getDownloadsByYear(this.props.data);
      this.chartInstance.data.labels = getLabels(downloadsByYear);
      this.chartInstance.data.datasets = getDatasets(downloadsByYear);
      this.chartInstance.options = getOptions(this.props.data);
      this.chartInstance.update();
    }
  }
  componentWillUnmount() {
    if (this.chartInstance) this.chartInstance.destroy();
  }
  render() {
    return (
      <canvas ref={node => (this.chartRef = node)} width="400" height="200" />
    );
  }
}
