import React, { useState, useEffect } from 'react';
import CPU from '../components/metrics/Cpu.jsx';
import Memory from '../components/metrics/Memory.jsx';
import GaugeChart from 'react-gauge-chart';

import { Data } from '../../utils/Data.js';

const systemMetrics = ({ totals }) => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.titles),
    datasets: [
      {
        label: '% of CPU',
        data: Data.map((data) => data.labels),
        backgroundColor: ['rgb(159, 70, 70)', 'rgb(77, 153, 77)'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  //const {cpu, memory} = totals

  return (
    <div className="SystemMetrics">
      {/* <CPU cpuStat = {cpu}/> */}
      <CPU chartData={chartData} />
      {/* <Memory memoryStat = {memory}/> */}
      <GaugeChart
        id="gauge-chart3"
        nrOfLevels={20}
        colors={['#FF5F6D', '#FFC371']}
        arcWidth={0.3}
        percent={0.37}
      />
    </div>
  );
};

export default systemMetrics;
