import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import LiquidGuage from '../LiquidGauge.jsx';

const memory = (props) => {
  // console.log('cpu', props.totals);
  const totalMemPerc = props.totals.hasOwnProperty('totalMemPercentage')
    ? props.totals.totalMemPercentage
    : 0;

  // console.log(totals)
  return (
    // <GaugeChart
    //   className="gauge"
    //   id="gauge-chart4"
    //   nrOfLevels={20}
    //   colors={['#FFC371', '#FF5F6D']}
    //   arcWidth={0.3}
    //   percent={totalMemPerc / 100}
    // />
    <LiquidGuage
      percent={100 - totalMemPerc}
      width={100}
      height={100}
      label={'FREE MEMORY'}
    />
  );
};

export default memory;
