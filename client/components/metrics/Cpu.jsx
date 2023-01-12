import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import LiquidGuage from '../LiquidGauge.jsx';

const cpu = (props) => {
  console.log('cpu', props.totals);
  const totalCpuPerc = props.totals.hasOwnProperty('totalCpuPercentage')
    ? props.totals.totalCpuPercentage
    : 0;

  return (
    // <GaugeChart
    //   className="gauge"
    //   id="gauge-chart3"
    //   nrOfLevels={3}
    //   colors={['#38b000', '#001427']}
    //   textColor={'#f8f7ff'}
    //   needleColor={'#c6def1'}
    //   arcWidth={0.2}
    //   cornerRadius={0}
    //   percent={totalCpuPerc / 100}
    // />
    <LiquidGuage percent={100 - totalCpuPerc} width={100} height={100} label={"FREE CPU"}/>
  );
};

export default cpu;
