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

export default function ChartComponent({ metric, slideInfo, dataLength }) {
  if (slideInfo.value.length > 10) {
    slideInfo.value = slideInfo.value.slice(
      slideInfo.value.length - dataLength
    );
    slideInfo.time = slideInfo.time.slice(slideInfo.time.length - dataLength);
  }
  // console.log(slideInfo.value);
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
    scales: {
      xAxis: {
        ticks: {
          maxTicksLimit: 10,
        },
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
