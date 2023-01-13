import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import LiquidGuage from '../LiquidGauge.jsx';

const cpu = (props) => {
  console.log('cpu', props.totals);
  const totalCpuPerc = props.totals.hasOwnProperty('totalCpuPercentage')
    ? props.totals.totalCpuPercentage
    : 0;

  return (
    <div className='chartLabal'>
      <label>% CPU Available</label>
      <LiquidGuage
        className="liquidGauge"
        percent={100 - totalCpuPerc}
        width={150}
        height={150}
      />
    </div>
  );
};

export default cpu;
