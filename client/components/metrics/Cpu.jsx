import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';

const cpu = ({totals}) => {
  // console.log('cpu', totals.totalCpuPercentage);

  return (
    <GaugeChart
      id="gauge-chart3"
      nrOfLevels={20}
      colors={['#FFC371', '#FF5F6D']}
      arcWidth={0.3}
      percent={totals.totalCpuPercentage / 100}
    />
  );
};

export default cpu;
