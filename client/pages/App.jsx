import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SystemMetrics from '../containers/SystemMetrics.jsx';
import Environments from '../containers/Environments.jsx';
import Carousel from '../containers/Carousel.jsx';

let count = 0;
const App = () => {
  const [totals, setTotals] = useState({});
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
            // console.log(res.data);
            // console.log('res data the first time', res.data);
            setQueryData({ ...res.data });

            count++;
          } else {
            console.log('in the else statement', queryData);
            // console.log(queryData, 'initial queryData');
            setQueryData((prev) => {
              const newQueryState = { ...prev };
              for (let key in res.data) {
                //for the totals key, since this is just a snap shot and not a time series data, we just replace the old values with the new value.
                if (key === 'totals') {
                  newQueryState[key] = res.data[key];
                } else {
                  //for all the container keys, we drill into the memory and cpu properties of each container, and expand the time and value arrays.

                  newQueryState[key]['memory']['time'] = [
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
          clearInterval(intervalID);
          const allContainers = [];
          const activeContainers = [];
          const totals = queryData.totals;
          // delete res.data.totals;

          for (const key in queryData) {
            if (key !== 'totals') {
              allContainers.push(queryData[key]);
              if (queryData[key].State === 'running') {
                activeContainers.push(queryData[key]);
              }
            }
          }
          setTotals(totals);
          setAllContainers(allContainers);
          setActiveContainers(activeContainers);
        })
        .catch((err) =>
          console.log('Initial fetch GET request to DB: ERROR: ', err)
        );
    }, 1000);
  }, [queryData]);

  //could try splitting res up into three pieces add a third thats just the container names and preview info, then both sidebars could be finished easy and the main section is the only place well need to do that building out logic

  // console.log('totals :', { totals });
  // console.log('activeContainers :', { activeContainers });
  // console.log('containers :', { containers });

  return (
    <div className="App">
      <header className="header">
        <div className="logo"></div>
        {/* <div className="title">DOCKWELL</div>  */}
        <div className="links"></div>
      </header>
      <div className="main">
        <Environments allContainers={allContainers} />
        {/* <Carousel activeContainers={activeContainers} /> */}
        <SystemMetrics totals={totals} />
      </div>
    </div>
  );
};

export default App;
