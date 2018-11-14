import approximateNumber from "approximate-number";

export default {
  elements: {
    point: {
      radius: 1,
      hitRadius: 3
    }
    // line: { cubicInterpolationMode: "monotone" }
  },
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          display: true,
          drawBorder: false
        },
        ticks: {
          beginAtZero: true,
          callback: (value /* , index, values */) => approximateNumber(value)
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ]
  },
  tooltips: {
    callbacks: {
      label: tooltipItem => tooltipItem.yLabel.toLocaleString("en")
    }
  }
};
