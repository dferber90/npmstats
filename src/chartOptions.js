import approximateNumber from "approximate-number";

export default {
  elements: {
    point: {
      radius: 1,
      hitRadius: 3
    }
    // line: { cubicInterpolationMode: "monotone" }
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
      label: function(tooltipItem, data) {
        var label = data.datasets[tooltipItem.datasetIndex].label || "";
        if (label) label += ": ";
        label += tooltipItem.yLabel.toLocaleString("en");
        return label;
      }
    }
  }
};
