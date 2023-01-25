import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CPU from '../components/metrics/Cpu';
import Memory from '../components/metrics/Memory';
import CpuPer from '../components/metrics/CpuPer';
import MemPer from '../components/metrics/MemPer';
import Legend from '../components/Legend';

const systemMetrics = ({ activeContainers }) => {
  const [totalMetrics, setTotalsData] = useState({});
  const memPieData = [];
  const memPieLabels = [];
  const cpuPieData = [];
  const cpuPieLabels = [];
  const legend = [];
  const getTotalsFunc = () => {
    axios
      .get('/api/getTotals')
      .then((res) => {
        setTotalsData(res.data);
      })
      .catch((err) => {
        console.log('Error getting totals: ' + err);
      });
    return getTotalsFunc;
  };
  useEffect(() => {
    setInterval(getTotalsFunc(), 1000);
  }, []);

  for (let i = 0; i < activeContainers.length; i++) {
    memPieLabels.push(activeContainers[i].Names);
    cpuPieLabels.push(activeContainers[i].Names);
    legend.push(activeContainers[i].Names);
    const memArr = activeContainers[i].memory.value;
    const cpuArr = activeContainers[i].cpu.value;
    memPieData.push(memArr[memArr.length - 1]);
    cpuPieData.push(cpuArr[cpuArr.length - 1]);
  }
  // const totalmetrics = totals ? totals : {};
  const healthFail = totalMetrics.dockerHealthFailures;

  const healthColor = healthFail === 0 ? 'green' : 'red';

  return (
    <>
      <div className="SystemMetrics">
        <div className="mem">
          <label>Memory Usage/Breakdown</label>
          <div className="circles">
            <Memory className="liquidGauge" totals={totalMetrics} />
            <MemPer memData={memPieData} memLabels={memPieLabels} />
          </div>
        </div>
        <div className="cpu">
          <label>CPU Usage/Breakdown</label>
          <div className="circles">
            <CPU className="liquidGauge" totals={totalMetrics} />
            <CpuPer cpuData={cpuPieData} cpuLabels={cpuPieLabels} />
          </div>
        </div>
        <div className="bottom">
          <div className="errors">
            <div className="healthfail">
              <div id="title">Health Failures: </div>
              <div id="num" className={healthColor}>
                {healthFail}
              </div>
            </div>
          </div>
          <div className="legend">
            <Legend names={legend} cpuData={cpuPieData} memData={memPieData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default systemMetrics;
