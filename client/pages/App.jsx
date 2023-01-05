import React from 'react';
import SystemMetrics from '../containers/SystemMetrics.jsx';
import Environments from '../containers/Environments.jsx';
import Carousel from '../containers/Carousel.jsx';

const App = () => {
  return (
    <div className="App">
      <header className="header">
        <div className="overlay">
          {/* <div className="logo">🐳</div>
          <div className="title">DOCKWELL</div> */}
          <div className="links"></div>
        </div>
      </header>
      <div className="main">
        <Environments />
        <Carousel />
        <SystemMetrics />
      </div>
    </div>
  );
};

export default App;
