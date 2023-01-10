import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';

const cpu = (props) => {
  console.log('cpu', props.totals);
  const totalCpuPerc = props.totals.hasOwnProperty('totalCpuPercentage')
    ? props.totals.totalCpuPercentage
    : 0;

  return (
    <GaugeChart
      id="gauge-chart3"
      nrOfLevels={20}
      colors={['#FFC371', '#FF5F6D']}
      arcWidth={0.3}
      percent={totalCpuPerc / 100}
    />
  );
};

export default cpu;
