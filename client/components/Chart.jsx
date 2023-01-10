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

export default function ChartComponent(props) {
  const options = {
    // responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${props.metric}`,
      },
    },
    // maintainAspectRatio: false,
  };

  const data = {
    labels: props.slideInfo.time,
    datasets: [
      {
        label: 'hello',
        data: props.slideInfo.value,
        borderColor: '#577399',
        backgroundColor: '#fe605555',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
