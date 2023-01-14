import React from 'react';

const Legend = ({ names, cpuData, memData }) => {
  const namesArray = [];
  let totalCpu = 0;
  let totalMem = 0;
  for (let i = 0; i < names.length; i++) {
    names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1);
    totalCpu += cpuData[i];
    totalMem += Number(memData[i]);
    // names[i] = names[i].toUppercase();
  }
  for (let i = 0; i < names.length; i++) {
    namesArray.push(
      <div className={`legendItem${i + 1}`}>
        {names[i]}
        <div className="data">
          <div className="memData">
            Memory Usage {`${Math.trunc((memData[i] / totalMem) * 100)}%`}
          </div>
          <div className="cpuData">
            CPU Usage {`${Math.trunc((cpuData[i] / totalCpu) * 100)}%`}
          </div>
        </div>
      </div>
    );
  }

  return <div className="legend">{namesArray}</div>;
};

export default Legend;
