import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CPU from '../components/metrics/Cpu.jsx';
import { Data } from '../../utils/Data.js';

function CarouselDisplay() {
  const interval = 5000000000;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.titles),
    datasets: [
      {
        label: '% of CPU',
        data: Data.map((data) => data.labels),
        backgroundColor: ['rgb(159, 70, 70)', 'rgb(77, 153, 77)'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  return (
    <Carousel
      controls={true}
      prevLabel={''}
      nextLabel={''}
      activeIndex={index}
      onSelect={handleSelect}
      keyboard={true}
    >
      <Carousel.Item interval={interval}>
        <CPU chartData={chartData} />
        <CPU chartData={chartData} />
        <CPU chartData={chartData} />
        <CPU chartData={chartData} />
      </Carousel.Item>
      <Carousel.Item interval={interval}>
        <CPU chartData={chartData} />
        <CPU chartData={chartData} />
        <CPU chartData={chartData} />
        <CPU chartData={chartData} />
      </Carousel.Item>
      <Carousel.Item interval={interval}>
        <CPU chartData={chartData} />
        <CPU chartData={chartData} />
        <CPU chartData={chartData} />
        <CPU chartData={chartData} />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselDisplay;
