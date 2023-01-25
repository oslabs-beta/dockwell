import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SystemMetrics from '../containers/SystemMetrics';
import Environments from '../containers/Environments';
import Carousel from '../containers/Carousel';
import Logs from '../containers/Logs';
import LiquidGauge from '../components/LiquidGauge';
import Links from '../containers/Links';

const App = () => {
  const [queryData, setQueryData] = useState({});
  //filters running containers
  // const [allContainers, setAllContainers] = useState([]);
  const [activeContainers, setActiveContainers] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const getStatsFunc = () => {
    axios
      .get('/api/getStats')
      .then((res) => {
        setQueryData((prev) => {
          const newQueryState = { ...prev };
          for (const key in res.data) {
            if (!(key in newQueryState)) {
              newQueryState[key] = res.data[key];
            } else if (
              // key !== 'totals' &&
              newQueryState[key].State === 'running' &&
              newQueryState[key].cpu &&
              newQueryState[key].memory &&
              res.data[key].cpu &&
              res.data[key].memory
            ) {
              // newQueryState[key].State = res.data[key].State;
              // newQueryState[key].Status = res.data[key].Status;
              // newQueryState[key].Ports = res.data[key].Ports;
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
            } else {
              //update all keys' values (these shouldn't have metrics)
              newQueryState[key] = res.data[key];
            }
          }

          return newQueryState;
        });
      })
      .catch((err) => console.error('Error updating main metrics: ', err));
    return getStatsFunc;
  };

  useEffect(() => {
    //tell it to repeat
    setInterval(getStatsFunc(), 1000);
  }, []);

  useEffect(() => {
    const activeContainers = [];
    for (const key in queryData) {
      if (key !== 'totals') {
        if (
          queryData[key].State === 'running' &&
          queryData[key].cpu &&
          queryData[key].memory
        ) {
          setLoadingScreen(false);
          activeContainers.push(queryData[key]);
        }
      }
    }
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
              label="LOADING METRICS..."
            />
          </div>
        </>
      )}
      {!loadingScreen && (
        <div className="main">
          <div className="left">
            <div className="top">
              <div className="title">
                <h1>Dockwell.</h1>
                <h2>A docker visualizer</h2>
                <Links />
              </div>
              <img src="https://i.imgur.com/9KoYyqd.png" />
            </div>
            <SystemMetrics activeContainers={activeContainers} />
          </div>
          <div className="middle">
            <div className="CarouselDiv">
              <Carousel
                className="carousel"
                activeContainers={activeContainers}
              />
            </div>
          </div>
          <div className="right">
            <Environments />
            <div className="logs">
              <Logs
                classname="logs-container"
                activeContainers={activeContainers}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
