import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';

const memory = ({totals}) => {
  // console.log('mem :', totals.totalMemPercentage);
  
  // console.log(totals)
  return (
    <GaugeChart
      id="gauge-chart4"
      nrOfLevels={20}
      colors={['#FFC371', '#FF5F6D']}
      arcWidth={0.3}
      percent={totals.totalMemPercentage / 100}
    />
  );
}

export default memory;