import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CPU from '../components/metrics/Cpu.jsx';
import Chart from '../components/Chart.jsx';

function CarouselDisplay(props) {
  //carousel vvvvvvvvvvvvvvvvvvvvvvvvvvv
  const interval = 50000000;
  const [index, setIndex] = useState(0);
  const [dataLength, setDataLength] = useState(100);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  //carousel ^^^^^^^^^^^^^^^^^^^^^^^^^^^

  const carouselSlides = props.activeContainers.map((obj, i) => (
    <Carousel.Item interval={interval} key={'container ' + i}>
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
        name={obj.Names}
      />
      <Chart
        className="lineChart"
        dataLength={dataLength}
        slideInfo={obj.cpu}
        metric="CPU Usage"
        name={obj.Names}
      />
      <Chart
        className="lineChart"
        dataLength={dataLength}
        slideInfo={obj.memCache}
        metric="Memory Cache"
        name={obj.Names}
      />
    </Carousel.Item>
  ));

 
  return (
      <Carousel
        controls={true}
        prevLabel={''}
        nextLabel={''}
        activeIndex={index}
        onSelect={handleSelect}
        keyboard={true}
      >
        {carouselSlides}
        {/* <Carousel.Item interval={interval}>
        </Carousel.Item>
        <Carousel.Item interval={interval}></Carousel.Item>
        <Carousel.Item interval={interval}></Carousel.Item> */}
      </Carousel>
    );

}

export default CarouselDisplay;


