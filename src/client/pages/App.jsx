import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SystemMetrics from '../containers/SystemMetrics.jsx';
import Environments from '../containers/Environments.jsx';
import Carousel from '../containers/Carousel.jsx';
import Logs from '../containers/Logs.jsx';
import LiquidGauge from '../components/LiquidGauge.jsx';

// let count = 0;
const App = () => {
  const [queryData, setQueryData] = useState({});
  //filters running containers
  const [allContainers, setAllContainers] = useState([]);
  const [activeContainers, setActiveContainers] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const getStatsFunc = () => {
    axios
      .get('/api/getStats')
      .then((res) => {
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
            } else {
              //update all keys' values (these shouldn't have metrics)
              newQueryState[key] = res.data[key];
            }
          }

          setLoadingScreen(false);
          return newQueryState;
        });
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
        </>
      )}
      {!loadingScreen && (
        <div className="main">
          <div className="left">
            <div className="title">
              <h1>Dockwell.</h1>
              <h2>A docker visualizer</h2>
              <div className="links">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-house"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                </svg>
                <a href="https://dockwell.tech/" className="btn btn-link">
                  About
                </a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <a
                  href="https://github.com/oslabs-beta/dockwell"
                  className="btn btn-link"
                >
                  GitHub
                </a>
              </div>
            </div>
            <SystemMetrics
              totals={queryData.totals}
              activeContainers={activeContainers}
            />
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
