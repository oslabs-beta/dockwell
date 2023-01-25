import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export function CpuPer({ cpuData, cpuLabels }) {

  const data = {

    datasets: [
      {
        label: 'CPU Usage (%)',
        data: cpuData,
        backgroundColor: [
          'rgba(102, 103, 171, .8)', 
          'rgba(84, 121, 85, .8)',
          'rgba(234, 103, 89, .8)', 
          'rgba(248, 143, 88, .8)', 
          'rgba(243, 198, 95, .8)',
          'rgba(241, 138, 173, .8)', 
        ],
        borderColor: [
          'rgba(102, 103, 171, 1)', 
          'rgba(84, 121, 85, .1)',
          'rgba(234, 103, 89, 1)', 
          'rgba(248, 143, 88, 1)', 
          'rgba(243, 198, 95, 1)',
          'rgba(241, 138, 173, 1)', 
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="piechart">
      <Pie
        data={data}
        width={'160px'}
        options={{ maintainAspectRatio: true }}
      />
    </div>
  );
}

export default CpuPer;
