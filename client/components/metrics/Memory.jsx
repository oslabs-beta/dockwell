import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';

const memory = (props) => {
  // console.log('cpu', props.totals);
  const totalMemPerc = props.totals.hasOwnProperty('totalMemPercentage')
    ? props.totals.totalMemPercentage
    : 0;
  
  // console.log(totals)
  return (
    <GaugeChart
      className="gauge"
      id="gauge-chart4"
      nrOfLevels={20}
      colors={['#FFC371', '#FF5F6D']}
      arcWidth={0.3}
      percent={totalMemPerc / 100}
    />
  );
}

export default memory;