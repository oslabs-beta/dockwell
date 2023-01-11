import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SystemMetrics from '../containers/SystemMetrics.jsx';
import Environments from '../containers/Environments.jsx';
import Carousel from '../containers/Carousel.jsx';
import Logs from '../containers/Logs.jsx';

let count = 0;
const App = () => {
  const [queryData, setQueryData] = useState({});
  //filters running containers
  const [allContainers, setAllContainers] = useState([]);
  const [activeContainers, setActiveContainers] = useState([]);
  // const [userPreviews, setUserPreviews] = useState([]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      axios
        .get('http://localhost:3535/api/getStats')
        .then((res) => {
          //check if queryData is empty
          if (count === 0) { 
            setQueryData(res.data);
            count++;
          } else {
            console.log('in the else statement', queryData.totals); 
            setQueryData((prev) => {
              const newQueryState = { ...prev };
              for (let key in res.data) {
                newQueryState[key].State = res.data[key].State
                //for the totals key, since this is just a snap shot and not a time series data, we just replace the old values with the new value.
                if (key === 'totals') {
                  newQueryState[key] = res.data[key];
                } else if (res.data[key].State !== 'running') {
                  continue;
                } else {
                  //for all the container keys, we drill into the memory and cpu properties of each container, and expand the time and value arrays.

                  newQueryState[key].memory.time = [
                    ...prev[key].memory.time,
                    ...res.data[key].memory.time,
                  ];
                  newQueryState[key].memory.value = [
                    ...prev[key].memory.value,
                    ...res.data[key].memory.value,
                  ];
                  newQueryState[key].cpu.time = [
                    ...prev[key].cpu.time,
                    ...res.data[key].cpu.time,
                  ];
                  newQueryState[key].cpu.value = [
                    ...prev[key].cpu.value,
                    ...res.data[key].cpu.value,
                    //...(prev[key].cpu.value[prev[key].cpu.value.length] - res.data[key].cpu.value[0])
                  ];
                  newQueryState[key].cpu.value = [
                    ...prev[key].cpu.value,
                    ...res.data[key].cpu.value,
                    // ...[prev[key].cpu.valueC[prev[key].cpu.valueC.length - 1] -
                    //   res.data[key].cpu.value[0]],
                  ];
                  newQueryState[key].memCache.value = [
                    ...prev[key].memCache.value,
                    ...res.data[key].memCache.value,
                  ];
                  newQueryState[key].memCache.value = [
                    ...prev[key].memCache.value,
                    ...res.data[key].memCache.value,
                  ];
                }
              }

              return newQueryState;
            });
          }
        })
        .catch((err) =>
          console.log('Initial fetch GET request to DB: ERROR: ', err)
        );
     
    }, 1000);
  }, []); 

  useEffect(() => {
    const allContainers = [];
    const activeContainers = [];
    console.log('UPDATED', queryData);
    for (const key in queryData) {
      if (key !== 'totals') {
        allContainers.push(queryData[key]);
        if (queryData[key].State === 'running') {
          activeContainers.push(queryData[key]);
        }
      }
    }
    setAllContainers(allContainers);
    setActiveContainers(activeContainers);
  }, [queryData]);
  return  (
    <div className="App">
      <header className="header">
        <div className="logo"></div>
        <div className="links"></div>
      </header>
      {true && (
        <div className="main">
          <div className="left">
            <div className="title">DOCKWELL</div>
            <Logs classname="logs-container" activeContainers={activeContainers} />
          </div>
          <div className="middle">
            <Carousel activeContainers={activeContainers} />
            <SystemMetrics totals={queryData.totals} />
          </div>
          <div className="right">
            <Environments allContainers={allContainers} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
