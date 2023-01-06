import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const cpu = ({ chartData }) => {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: 'center' }}>Pie Chart</h2> */}
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'CPU',
            },
          },
        }}
      />
    </div>
  );
};

export default cpu;
