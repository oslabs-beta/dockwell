import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import LiquidGuage from '../LiquidGauge';

const memory = (props) => {
  const totalMemPerc = props.totals['totalMemPercentage']
    ? props.totals.totalMemPercentage
    : 0;

  return (
    <div className="liquidGauge">
      <LiquidGuage percent={totalMemPerc} width={150} height={150} />
    </div>
  );
};

export default memory;
