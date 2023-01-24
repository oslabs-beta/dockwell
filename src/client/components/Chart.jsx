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

export default function ChartComponent({
  metric,
  activeContainer,
  dataLength,
}) {
  let x, y;
  if (activeContainer.value.length > dataLength) {
    y = activeContainer.value.slice(activeContainer.value.length - dataLength);
    x = activeContainer.time.slice(activeContainer.time.length - dataLength);
  } else {
    y = activeContainer.value;
    x = activeContainer.time;
  }
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${metric}`,
      },
    },
  };

  const data = {
    labels: x,
    datasets: [
      {
        label: '',
        data: y,
        borderColor: '#f8f2e7',
        backgroundColor: '#ffffff',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
