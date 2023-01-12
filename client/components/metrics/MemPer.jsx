import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export function CpuPer({ memData, memLabels }) {
  // console.log('memData: ', memData)
  // console.log('label: ', memLabels);
  const data = {
    options: {
      plugins: {
        datalabels: {
          display: true,
          align: 'left',
        },
      },
    },
    // labels: memLabels,
    datasets: [
      {
        label: '# of Votes',
        data: memData,
        backgroundColor: [
          'rgba(255, 99, 132, .7)',
          'rgba(54, 162, 235, .7)',
          'rgba(255, 206, 86, .7)',
          'rgba(75, 192, 192, .7)',
          'rgba(153, 102, 255, .7)',
          'rgba(255, 159, 64, .7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chartLabal">
      <label>Memory Usage</label>
      <Pie className="piechart" data={data} />
    </div>
  );
}

export default CpuPer;
