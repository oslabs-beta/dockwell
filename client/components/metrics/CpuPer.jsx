import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export function CpuPer({ cpuData, cpuLabels }) {
  console.log('cpuData: ', cpuData);
  console.log('label: ', cpuLabels);

  const data = {
    // labels: cpuLabels,

    datasets: [
      {
        label: '# of Votes',
        data: cpuData,
        backgroundColor: [
          'rgba(255, 99, 132, .8)',
          'rgba(54, 162, 235, .8)',
          'rgba(255, 206, 86, .8)',
          'rgba(75, 192, 192, .8)',
          'rgba(153, 102, 255, .8)',
          'rgba(255, 159, 64, .8)',
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
      <label>CPU Usage</label>
      <Pie className="piechart" data={data} />
    </div>
  );
}

export default CpuPer;
