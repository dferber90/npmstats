import { h, Component } from "preact";
import Chart from "chart.js";
import chartOptions from "./chartOptions.js";

export class DailyChart extends Component {
  chartRef = null;
  componentDidMount() {
    new Chart(this.chartRef, {
      type: "line",
      data: {
        labels: this.props.downloads.map((stats, index) => stats.day),
        datasets: [
          {
            data: this.props.downloads.map(stats => stats.downloads),
            backgroundColor: "transparent",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        ...chartOptions,
        title: {
          display: true,
          text: `Downloads per day`
        }
      }
    });
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
