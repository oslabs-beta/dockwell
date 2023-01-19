import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CPU from '../components/metrics/Cpu.jsx';
import Chart from '../components/Chart.jsx';

function CarouselDisplay(props) {
  const [index, setIndex] = useState(0);
  const [dataLength, setDataLength] = useState(25);
  const interval = 50000000;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // console.log('AC', activeContainers);

  return (
    <Carousel
      controls={true}
      prevLabel={''}
      nextLabel={''}
      activeIndex={index}
      onSelect={handleSelect}
      keyboard={true}
    >
      {props.activeContainers.map((obj, i) => (
        <Carousel.Item interval={interval} key={'container ' + i}>
          <div className="header">
            <h2 style={{ display: 'inline', marginRight: '8px' }}>
              {obj.Names}
            </h2>
            <select
              onChange={(e) => {
                e.preventDefault();
                setDataLength(e.target.value);
              }}
            >
              <option value={dataLength}>{dataLength}</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={Infinity}>Infinity</option>
            </select>
          </div>
          <Chart
            className="lineChart"
            dataLength={dataLength}
            activeContainer={obj.memory}
            metric="Memory Usage (bytes)"
          />
          <Chart
            className="lineChart"
            dataLength={dataLength}
            activeContainer={obj.cpu}
            metric="CPU Usage"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselDisplay;
