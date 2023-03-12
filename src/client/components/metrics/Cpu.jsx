import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import LiquidGuage from '../LiquidGauge.jsx';

const cpu = (props) => {
  const totalCpuPerc = props.totals.totalCpuPercentage || 0;

  return (
    <div className="liquidGauge">
      <LiquidGuage percent={totalCpuPerc} width={150} height={150} />
    </div>
  );
};

export default cpu;
