import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SystemMetrics from '../containers/SystemMetrics.jsx';
import Environments from '../containers/Environments.jsx';
import Carousel from '../containers/Carousel.jsx';

const App = () => {
  const [totals, setTotal] = useState({});
  // const [memTotal, setMemTotals] = useState({});
  const [containers, setContainers] = useState([]);
  const [userPreviews, setUserPreviews] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3535/api/getStats')
      .then((res) => {
        console.log(res.data);
        let totals = {}
        let CPUtotal;
        let memoryTotal;
        for (const key in res.data) {
          console.log(res.data[key])
        if (res.data[key].State === 'running') {
          memoryTotal = res.data[key].memory.value
          CPUtotal = res.data[key].cpu.value
        }
        totals.cpuTotal = CPUtotal
        totals.memoryTotal = memoryTotal
        }
        console.log('totals :', totals)
        setTotals(totals);
        setContainers(res.data.containers);
      })
      .catch((err) =>
        console.log('Initial fetch GET request to DB: ERROR: ', err)
      );
  }, []);

  //could try splitting res up into three pieces add a third thats just the container names and preview info, then both sidebars could be finished easy and the main section is the only place well need to do that building out logic

  //

  return (
    <div className="App">
      <header className="header">
        <div className="logo"></div>
        {/* <div className="title">DOCKWELL</div>  */}
        <div className="links"></div>
      </header>
      <div className="main">
        <Environments />
        {/* <Environments userPreviews={userPreviews} /> */}
        <Carousel />
        {/* <SystemMetrics totals={totals}/> */}
        <SystemMetrics />
      </div>
    </div>
  );
};

export default App;
