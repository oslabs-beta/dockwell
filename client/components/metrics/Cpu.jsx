import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';

<<<<<<< HEAD
const cpu = (props) => {
  console.log('cpu', props.totals);
  const totalCpuPerc = props.totals.hasOwnProperty('totalCpuPercentage')
    ? props.totals.totalCpuPercentage
    : 0;
=======
const cpu = ({totals}) => {
  // console.log('cpu', totals.totalCpuPercentage);
>>>>>>> 942a327a4dc8269e44aedfd1376d374f888cc23d

  return (
    <GaugeChart
      id="gauge-chart3"
      nrOfLevels={20}
      colors={['#FFC371', '#FF5F6D']}
      arcWidth={0.3}
<<<<<<< HEAD
      percent={totalCpuPerc}
=======
      percent={totals.totalCpuPercentage / 100}
>>>>>>> 942a327a4dc8269e44aedfd1376d374f888cc23d
    />
  );
};

export default cpu;
