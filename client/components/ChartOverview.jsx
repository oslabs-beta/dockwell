import React, { useEffect, useState } from 'react';
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
  activeContainers,
  dataLength,
  title,
}) {
  const [options, setOptions] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    let overviewLabels;
    if (activeContainers[0][metric].time.length > dataLength) {
      overviewLabels = activeContainers[0][metric].time.slice(
        activeContainers[0][metric].time.length - dataLength
      );
    } else {
      overviewLabels = activeContainers[0][metric].time;
    }
    let overviewDatasets = activeContainers.map((x) => {
      let a;
      if (x[metric].value.length > dataLength) {
        a = x[metric].value.slice(x[metric].value.length - dataLength);
      } else {
        a = x[metric].value;
      }

      return {
        label: x.Names,
        data: a,
        borderColor: '#f1d3b3',
        backgroundColor: '#fe605555',
      };
    });

    console.log('x&y', overviewDatasets, overviewLabels);

    setOptions(() => ({
      // responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${title}`,
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
    }));
    setData(() => ({
      labels: overviewLabels,
      datasets: overviewDatasets,
    }));
  }, [activeContainers]);

  return (
    (activeContainers ? true : false) && <Line options={options} data={data} />
  );
}
