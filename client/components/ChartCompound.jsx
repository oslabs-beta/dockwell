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
  'rgba(255, 99, 132, .7)',
  'rgba(54, 162, 235, .7)',
  'rgba(255, 206, 86, .7)',
  'rgba(75, 192, 192, .7)',
  'rgba(153, 102, 255, .7)',
  'rgba(255, 159, 64, .7)',
];

export default function ChartCompound({
  metric,
  allActiveContainers,
  dataLength,
  metricName,
}) {
  const options = {
    plugins: {
      // legend: {
      //   display: false,
      // },
      title: {
        display: true,
        text: `${metricName}`,
      },
    },
    scales: {
      // xAxes: {
      //   ticks: {
      //     // maxTicksLimit: 10,
      //     // display: false,
      //     color: 'white',
      //   },
      // },
      yAxes: {
        ticks: {
          // display: false,
          color: 'white',
        },
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
      // borderColor: randColor,
      // backgroundColor: randColor,
    };
  });

  const data = {
    labels: allXAxis[0],
    datasets: allYAxis,
  };

  return <Line options={options} data={data} />;
}
