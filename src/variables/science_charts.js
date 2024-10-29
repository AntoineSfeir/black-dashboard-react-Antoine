// Import necessary parts for charts
import { Chart as ChartJS } from "chart.js/auto";

// Pie Chart Data
export const pieChartExample = {
  data: {
    labels: ["CO2", "Methane", "Nitrous Oxide", "Fluorinated Gases"],
    datasets: [
      {
        label: "Emissions by Type",
        data: [55, 20, 15, 10],
        backgroundColor: ["#f56342", "#42a1f5", "#42f548", "#f5e142"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
};

// Heatmap-like Bubble Chart (simulated heatmap as Chart.js does not have native support)
export const heatMapExample = {
  data: {
    labels: ["Location A", "Location B", "Location C", "Location D"],
    datasets: [
      {
        label: "Low Emission",
        data: [5, 3, 4, 2],
        backgroundColor: "rgba(66, 165, 245, 0.7)",
        borderColor: "#42a5f5",
        borderWidth: 1,
      },
      {
        label: "Moderate Emission",
        data: [7, 5, 6, 4],
        backgroundColor: "rgba(245, 169, 66, 0.7)",
        borderColor: "#f5a942",
        borderWidth: 1,
      },
      {
        label: "High Emission",
        data: [9, 8, 10, 6],
        backgroundColor: "rgba(245, 66, 66, 0.7)",
        borderColor: "#f54242",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Intensity",
        },
      },
    },
  },
};
