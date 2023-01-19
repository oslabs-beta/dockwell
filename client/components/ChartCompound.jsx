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

export default function ChartCompound({
  metric,
  allActiveContainers,
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
    scales: {
      xAxis: {
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
  };
  const allXAxis = allActiveContainers.map((container) => {
    return container[metric]['time'];
  });

  const allYAxis = allActiveContainers.map((container) => {
    return {
      label: '',
      data: container[metric]['value'],
      borderColor: '#f8f2e7',
      backgroundColor: '#f2e6d4',
    };
  });

  const data = {
    labels: allXAxis[0],
    datasets: [
      {
        label: '',
        data: y,
        borderColor: '#f8f2e7',
        backgroundColor: '#f2e6d4',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
