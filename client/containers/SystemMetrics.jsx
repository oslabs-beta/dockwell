import React, { useState, useEffect } from 'react';
import cpu from '../components/metrics/Cpu.jsx';
import CPU from '../components/metrics/Cpu.jsx';
import Memory from '../components/metrics/Memory.jsx';
import CpuPer from '../components/metrics/CpuPer.jsx';
import MemPer from '../components/metrics/MemPer.jsx';



const systemMetrics = ({ totals, activeContainers }) => {
  const memPieData = [];
  const memPieLabels = [];
  const cpuPieData = [];
  const cpuPieLabels = [];

  for (let i = 0; i < activeContainers.length; i++) {
    memPieLabels.push(activeContainers[i].Names);
    cpuPieLabels.push(activeContainers[i].Names);
    let memArr = activeContainers[i].memory.value;
    let cpuArr = activeContainers[i].cpu.value;
    memPieData.push( memArr[memArr.length-1])
    cpuPieData.push( cpuArr[cpuArr.length-1])
  };
  // console.log('memPieData', memPieData);
  // console.log('memPieLabels', memPieLabels);
  // console.log('cpuPieData', cpuPieData);
  // console.log('cpuPieLabels', cpuPieLabels);
  

  //const {cpu, memory} = totals
  const totalmetrics = totals ? totals : {};

  return (
    <>
      <div className="SystemMetrics">
        <CPU className="liquidGauge" totals={totalmetrics} />
        <Memory className="liquidGauge" totals={totalmetrics} />
        <CpuPer cpuData={cpuPieData} cpuLabels={cpuPieLabels} />
        <MemPer memData={memPieData} memLabels={memPieLabels} />
      </div>
      <div className="legend">
        <div className="color1"><p>cadvisor</p></div>
        <div className="color2"><p>divrometheus</p></div>
        <div className="color3"><p>redis</p></div>
        <div className="color4"><p>getting-started-docs-1</p></div>
      </div>
    </>
  );
};

export default systemMetrics;
