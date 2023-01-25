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
const colors = [
  'rgba(102, 103, 171)',
  'rgba(84, 121, 85)',
  'rgba(234, 103, 89)',
  'rgba(248, 143, 88)',
  'rgba(243, 198, 95)',
  'rgba(241, 138, 173)',
];

export default function ChartCompound({
  metric,
  allActiveContainers,
  dataLength,
  metricName,
}) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: `${metricName}`,
      },
    },
  };

  const allXAxis = allActiveContainers.map((container) => {
    let x;
    if (container[metric].value.length > dataLength) {
      x = container[metric].time.slice(
        container[metric].time.length - dataLength
      );
    } else {
      x = container[metric].time;
    }
    return x;
  });

  const allYAxis = allActiveContainers.map((container, i) => {
    let y;
    if (container[metric].value.length > dataLength) {
      y = container[metric].value.slice(
        container[metric].value.length - dataLength
      );
    } else {
      y = container[metric].value;
    }

    const randColor =
      '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
    return {
      label: container.Names,
      data: y,
      borderColor: colors[i],
      backgroundColor: colors[i],
    };
  });

  const data = {
    labels: allXAxis[0],
    datasets: allYAxis,
  };

  return <Line options={options} data={data} />;
}
