import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CPU from '../components/metrics/Cpu.jsx';
import Chart from '../components/Chart.jsx';

function CarouselDisplay(props) {
  //carousel vvvvvvvvvvvvvvvvvvvvvvvvvvv
  const interval = 50000000;
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  //carousel ^^^^^^^^^^^^^^^^^^^^^^^^^^^

  console.log(props.activeContainers);

  const carouselSlides = props.activeContainers.map((obj, i) => (
    <Carousel.Item interval={interval} key={'container ' + i}>
      <h2>{obj.Names}</h2>
      <Chart
        className="lineChart"
        slideInfo={obj.memory}
        metric="Memory Usage (bytes)"
        name={obj.Names}
      />
      className='lineChart'
      <Chart
        className="lineChart"
        slideInfo={obj.cpu}
        metric="CPU Usage"
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
