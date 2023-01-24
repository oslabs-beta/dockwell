import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Chart from '../components/Chart.jsx';
import ChartCompound from '../components/ChartCompound.jsx';


function CarouselDisplay(props) {
  const [index, setIndex] = useState(0);
  const [dataLength, setDataLength] = useState(25);
  const interval = 50000000;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // console.log('AC', activeContainers);

  const dropDown = (
    <>
      <select
        className="dropdown"
        placeholder="Data Points:"
        defaultValue={null}
        onChange={(e) => {
          e.preventDefault();
          setDataLength(e.target.value);
        }}
      >
        <option value="" disabled selected>
          Data points:
        </option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={75}>75</option>
        <option value={Infinity}>Max</option>
      </select>
    </>
  );
  const memFail = [];
  for (let index = 0; index < props.activeContainers.length; index++) {
    memFail.push(props.activeContainers[index].memFailures.value[0]);
  }
  const totalMemFail = memFail.reduce((a, b) => {
    return a + b;
  }, 0);

  return (
    <Carousel
      controls={true}
      prevLabel={''}
      nextLabel={''}
      activeIndex={index}
      onSelect={handleSelect}
      keyboard={true}
    >
      <Carousel.Item
        interval={interval}
        key={'container '}
        className="carousel-item-styles"
      >
        <div className="header">
          <div className="badge rounded-pill bg-dark">
            Total Memory Failures: {totalMemFail}
          </div>
          <h2 style={{ display: 'inline', marginRight: '8px' }}>Overview</h2>
          {dropDown}
        </div>
        <ChartCompound
          allActiveContainers={props.activeContainers}
          metric="memory"
          dataLength={dataLength}
          metricName="Memory Usage (MB)"
        ></ChartCompound>
        <ChartCompound
          allActiveContainers={props.activeContainers}
          metric="cpu"
          dataLength={dataLength}
          metricName="CPU Usage (%)"
        ></ChartCompound>
      </Carousel.Item>
      {props.activeContainers.map((obj, i) => (
        <Carousel.Item interval={interval} key={'container ' + i}>
          <div className="header">
            <div className="badge rounded-pill bg-dark">
              Memory Failures: {obj.memFailures.value[0]}
            </div>
            <h2>{obj.Names}</h2>
            {dropDown}
          </div>
          <Chart
            className="lineChart"
            dataLength={dataLength}
            activeContainer={obj.memory}
            metric="Memory Usage (MB)"
          />
          <Chart
            className="lineChart"
            dataLength={dataLength}
            activeContainer={obj.cpu}
            metric="CPU Usage (%)"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselDisplay;
