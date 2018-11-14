import { h, Component } from "preact";
import Chart from "chart.js";
import chartOptions from "./chartOptions.js";

export class MonthlyChart extends Component {
  chartRef = null;
  componentDidMount() {
    const downloadsByMonth = Object.entries(
      this.props.downloads.reduce((acc, cur) => {
        const month = cur.day.substring(0, 7);
        if (!acc[month]) acc[month] = 0;
        acc[month] += cur.downloads;
        return acc;
      }, {})
    ).map(([month, downloads]) => ({ month, downloads }));

    new Chart(this.chartRef, {
      type: "line",
      data: {
        labels: downloadsByMonth.map(entry => entry.month),
        datasets: [
          {
            data: downloadsByMonth.map(entry => entry.downloads),
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
          text: `Downloads per month`
        }
      }
    });
  }
  render() {
    return (
      <canvas ref={node => (this.chartRef = node)} width="400" height="300" />
    );
  }
}
