import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const ReadingChart = ({ data }) => {
  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
      label: 'Articles Saved',
      data: data,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
    }],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Articles' } },
      x: { title: { display: true, text: 'Days' } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ReadingChart;