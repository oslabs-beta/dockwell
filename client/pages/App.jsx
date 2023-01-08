import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SystemMetrics from '../containers/SystemMetrics.jsx';
import Environments from '../containers/Environments.jsx';
import Carousel from '../containers/Carousel.jsx';

const App = () => {
  // const [totals, setTotals] = useState({});
  // const [containers, setContainers] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3535/api')
  //     .then((res) => {
  //       console.log(res.data);
  //       setTotals(res.data.totals);
  //       setContainers(res.data.containers);
  //     })
  //     .catch((err) =>
  //       console.log('Initial fetch GET request to DB: ERROR: ', err)
  //     );
  // }, []);

  return (
    <div className="App">
      <header className="header">
        <div className="logo"></div>
        {/* <div className="title">DOCKWELL</div>  */}
        <div className="links"></div>
      </header>
      <div className="main">
        <Environments />
        <Carousel id="carousel" />
        <SystemMetrics />
      </div>
    </div>
  );
};

export default App;
