import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartComponent({metric, slideInfo}) {
  const options = {
    // responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${metric}`,
      },
    },
    // maintainAspectRatio: false,
  };
  

  const data = {
    labels: slideInfo.time,
    datasets: [
      {
        label: 'hello',
        data: slideInfo.value,
        borderColor: '#f1d3b3',
        backgroundColor: '#fe605555',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
