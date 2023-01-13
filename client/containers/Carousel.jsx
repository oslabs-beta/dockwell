import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CPU from '../components/metrics/Cpu.jsx';
import Chart from '../components/Chart.jsx';
import ChartOverview from '../components/ChartOverview.jsx';

function CarouselDisplay({ activeContainers }) {
  const [index, setIndex] = useState(0);
  const [dataLength, setDataLength] = useState(100);
  const carouselInterval = 50000000;

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
      <Carousel.Item interval={carouselInterval} key={'container overview'}>
        <h2 style={{ display: 'inline', marginRight: '8px' }}>Overview</h2>
        <select
          onChange={(e) => {
            e.preventDefault();
            setDataLength(e.target.value);
          }}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={500}>500</option>
        </select>
        {/* <ChartOverview
          className="lineChart"
          dataLength={dataLength}
          activeContainers={activeContainers}
          metric="Memory Usage (bytes)"
        /> */}
        <ChartOverview
          className="lineChart"
          dataLength={dataLength}
          activeContainers={activeContainers}
          title="CPU Usage"
          metric="cpu"
        />
      </Carousel.Item>
      {activeContainers.map((obj, i) => (
        <Carousel.Item interval={carouselInterval} key={'container ' + i}>
          <h2 style={{ display: 'inline', marginRight: '8px' }}>{obj.Names}</h2>
          <select
            onChange={(e) => {
              e.preventDefault();
              setDataLength(e.target.value);
            }}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
          <Chart
            className="lineChart"
            dataLength={dataLength}
            slideInfo={obj.memory}
            metric="Memory Usage (bytes)"
          />
          <Chart
            className="lineChart"
            dataLength={dataLength}
            slideInfo={obj.cpu}
            metric="CPU Usage"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselDisplay;
