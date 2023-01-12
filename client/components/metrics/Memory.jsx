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
    <div className="chartLabal">
      <label>% Memory Available</label>

      <LiquidGuage
        className="liquidGauge"
        percent={100 - totalMemPerc}
        width={150}
        height={150}
      />
    </div>
  );
};

export default memory;
