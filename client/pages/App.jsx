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
            // queryData.ID===undefined
            // console.log(res.data);
            // console.log('res data the first time', res.data);
            setQueryData(res.data);

            count++;
          } else {
            console.log('in the else statement', queryData.totals);
            // console.log(queryData, 'initial queryData');
            setQueryData((prev) => {
              const newQueryState = { ...prev };
              for (let key in res.data) {
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
                  ];
                }
              }

              return newQueryState;
            });
          }
          // clearInterval(intervalID);
        })
        .catch((err) =>
          console.log('Initial fetch GET request to DB: ERROR: ', err)
        );
    }, 3000);
  }, []);

  //could try splitting res up into three pieces add a third thats just the container names and preview info, then both sidebars could be finished easy and the main section is the only place well need to do that building out logic

  // console.log('totals :', { totals });
  // console.log('activeContainers :', { activeContainers });
  // console.log('containers :', { containers });

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

  return (
    <div className="App">
      <header className="header">
        <div className="logo"></div>
        <div className="links"></div>
      </header>
      <div className="main">
        <div className="left">
          <div className="title">DOCKWELL</div>
          <Logs activeContainers={activeContainers} />
        </div>
        <div className="middle">
          <Carousel activeContainers={activeContainers} />
          <SystemMetrics totals={queryData.totals} />
        </div>
        <div className="right">
          <Environments allContainers={allContainers} />
        </div>
      </div>
    </div>
  );
};

export default App;
