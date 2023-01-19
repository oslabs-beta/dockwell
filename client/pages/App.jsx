import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SystemMetrics from '../containers/SystemMetrics.jsx';
import Environments from '../containers/Environments.jsx';
import Carousel from '../containers/Carousel.jsx';
import Logs from '../containers/Logs.jsx';
import LiquidGauge from '../components/LiquidGauge.jsx';

let count = 0;
const App = () => {
  const [queryData, setQueryData] = useState({});
  //filters running containers
  const [allContainers, setAllContainers] = useState([]);
  const [activeContainers, setActiveContainers] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const getStatsFunc = () => {
    axios
      .get('http://localhost:3535/api/getStats')
      .then((res) => {
        //check if queryData is empty
        // if (count === 0) {
        //   setQueryData(res.data);
        //   count++;
        // } else {
        setQueryData((prev) => {
          const newQueryState = { ...prev };
          for (let key in res.data) {
            if (!(key in newQueryState)) {
              newQueryState[key] = res.data[key];
            } else if (
              key !== 'totals' &&
              (newQueryState[key].State === 'running' ||
                newQueryState[key].State === 'paused')
            ) {
              // newQueryState[key].State = res.data[key].State;
              //for the totals key, since this is just a snap shot and not a time series data, we just replace the old values with the new value.
              // if (key === 'totals') {
              //   newQueryState[key] = res.data[key];
              // } else if (res.data[key].State !== 'running') {
              //   newQueryState[key] = res.data[key];
              //   continue;
              // } else {
              //for all the container keys, we drill into the memory and cpu properties of each container, and expand the time and value arrays.
              // if (
              //   res.data[key].hasOwnProperty('memory') &&
              //   res.data[key].hasOwnProperty('cpu')
              // ) {
              //update the keys whose values *might* change
              newQueryState[key].State = res.data[key].State;
              newQueryState[key].Status = res.data[key].Status;
              newQueryState[key].Ports = res.data[key].Ports;
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
              ];
              // }
            } else {
              //update all keys' values (these shouldn't have metrics)
              newQueryState[key] = res.data[key];
            }
          }

          setLoadingScreen(false);
          console.log('New State', newQueryState);
          return newQueryState;
        });
        // }
      })
      .catch((err) =>
        console.error('Initial fetch GET request to DB: ERROR: ', err)
      );
    return getStatsFunc;
  };

  useEffect(() => {
    //tell it to repeat
    setInterval(getStatsFunc(), 1000);
  }, []);

  useEffect(() => {
    const allContainers = [];
    const activeContainers = [];
    // console.log('UPDATED', queryData);
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

  return (
    <div className="App">
      {loadingScreen && (
        <>
          <div className="loadGauge">
            <LiquidGauge
              percent={0}
              width={500}
              height={500}
              label={'LOADING METRICS...'}
            />
          </div>
          {/* <p>LOADING METRICS</p> */}
        </>
      )}
      {!loadingScreen && (
        <div className="main">
          <div className="left">
            <div className="title">Dockwell.</div>
            <h2>A docker visualizer</h2>
            <Logs
              classname="logs-container"
              activeContainers={activeContainers}
            />
          </div>
          <div className="right">
            <div className="top">
              <div className="CarouselDiv">
                <Carousel
                  className="carousel"
                  activeContainers={activeContainers}
                />
              </div>
              <div className="environments">
                <Environments />
              </div>
            </div>
            <div className="bottom">
              <div className="systemMemWrapper">
                <SystemMetrics
                  totals={queryData.totals}
                  activeContainers={activeContainers}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
