import { h, Component } from "preact";
import Chart from "chart.js";
import chartOptions from "./chartOptions.js";

export class YearlyChart extends Component {
  chartRef = null;
  componentDidMount() {
    const downloadsByYear = Object.entries(
      this.props.downloads.reduce((acc, cur) => {
        const year = cur.day.substring(0, 4);
        if (!acc[year]) acc[year] = 0;
        acc[year] += cur.downloads;
        return acc;
      }, {})
    ).map(([year, downloads]) => ({ year, downloads }));

    new Chart(this.chartRef, {
      type: "line",
      data: {
        labels: downloadsByYear.map(entry => entry.year),
        datasets: [
          {
            data: downloadsByYear.map(entry => entry.downloads),
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
          text: `Downloads per year`
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
