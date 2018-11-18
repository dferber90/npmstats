import { h, Component } from "preact";
import Chart from "chart.js";
import chartOptions from "./chartOptions.js";
import { colors } from "./colors.js";

const getLabels = data => data[0].downloads.map((stats, index) => stats.day);
const getDatasets = data =>
  data.map((item, index) => ({
    label: item.name,
    data: item.downloads.map(day => day.downloads),
    backgroundColor: "transparent",
    borderColor: colors[index],
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
    text: `Downloads per day`
  }
});

export class DailyChart extends Component {
  chartRef = null;
  chartInstance = null;
  componentDidMount() {
    this.chartInstance = new Chart(this.chartRef, {
      type: "line",
      data: {
        labels: getLabels(this.props.data),
        datasets: getDatasets(this.props.data)
      },
      options: getOptions(this.props.data)
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.chartInstance.data.labels = getLabels(this.props.data);
      this.chartInstance.data.datasets = getDatasets(this.props.data);
      this.chartInstance.options = getOptions(this.props.data);
      this.chartInstance.update();
    }
  }
  componentWillUnmount() {
    this.chartInstance.destroy();
  }
  render() {
    return (
      <canvas
        ref={node => (this.chartRef = node)}
        id="dailyChart"
        width="400"
        height="300"
      />
    );
  }
}
