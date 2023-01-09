import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SystemMetrics from '../containers/SystemMetrics.jsx';
import Environments from '../containers/Environments.jsx';
import Carousel from '../containers/Carousel.jsx';

const App = () => {
  const [totals, setTotals] = useState({});
  //filters running containers
  const [allContainers, setAllContainers] = useState([]);
  const [activeContainers, setActiveContainers] = useState([]);
  // const [userPreviews, setUserPreviews] = useState([]);

  useEffect(() => {
   setInterval(() => {axios
      .get('http://localhost:3535/api/getStats')
      .then((res) => {
        const allContainers = []
        const activeContainers = []
        const totals  = res.data.totals
        delete res.data.totals

        for (const key in res.data) {
          allContainers.push(res.data[key])

          if (res.data[key].State === 'running') {
            activeContainers.push(res.data[key]);
          } 
        }
        setTotals(totals)
        setAllContainers(allContainers);
        setActiveContainers(activeContainers);
      })
      .catch((err) =>
        console.log('Initial fetch GET request to DB: ERROR: ', err)
      );}, 1000)
  }, []);

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
        <Environments allContainers={allContainers}  />
        <Carousel activeContainers={activeContainers}/>
        <SystemMetrics totals={totals}/>
        
      </div>
    </div>
  );
};

export default App;
