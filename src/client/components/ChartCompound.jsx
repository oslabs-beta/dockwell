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
  'rgba(102, 103, 171, .7)',
  'rgba(139, 194, 140, .7)',
  'rgba(234, 103, 89, .7)',
  'rgba(248, 143, 88, .7)',
  'rgba(243, 198, 95, .7)',
  'rgba(241, 138, 173, .7)',
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
