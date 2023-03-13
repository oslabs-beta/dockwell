/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Chart from '../components/Chart';
import ChartCompound from '../components/ChartCompound';
// import { ArrowDownSquareFill } from 'react-bootstrap-icons';

function CarouselDisplay(props: any) {
  const selector = useRef(null);
  const [index, setIndex] = useState(0);
  const [dataLength, setDataLength] = useState(25);
  const interval = 50000000;

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const dropDown = (
    <>
      <i className="bi bi-arrow-down-square-fill"></i>

      <select
        ref={selector}
        className="dropdown"
        defaultValue={'DEFAULT'}
        onChange={(e) => {
          e.preventDefault();
          setDataLength(selector.current.value);
        }}
      >
        <option value={'Default'}>Interval:</option>
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
          <h2
            style={{ display: 'inline', marginRight: '8px' }}
            onClick={(e) => {
              e.preventDefault();
              const output: any[] = [];
              props.activeContainers.forEach((x: any) => {
                const timestamp = [x.Names, 'timestamp'];
                x.memory.time.forEach((y: any) => timestamp.push(y));
                const memory = [x.Names, 'memory usage (MB)'];
                x.memory.value.forEach((y: any) => memory.push(y));
                const cpu = [x.Names, 'cpu usage (%)'];
                x.cpu.value.forEach((y: any) => cpu.push(y));
                output.push(timestamp, memory, cpu);
              });
              const csvContent =
                'data:text/csv;charset=utf-8,' +
                output.map((e) => e.join(',')).join('\n');
              const encodedUri = encodeURI(csvContent);
              var link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', 'allContainersData.csv');
              document.body.appendChild(link);
              link.click();
              link.remove();
            }}
          >
            Overview
          </h2>
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
      {props.activeContainers.map((obj: any, i: number) => (
        <Carousel.Item interval={interval} key={'container ' + i}>
          <div className="header">
            <div className="badge rounded-pill bg-dark">
              Memory Failures: {obj.memFailures.value[0]}
            </div>
            <h2
              onClick={(e) => {
                e.preventDefault();
                const output = [
                  ['timestamp'],
                  ['memory usage (MB)'],
                  ['cpu usage (%)'],
                ];
                obj.memory.time.forEach((x: any) => output[0].push(x));
                obj.cpu.value.forEach((x: any) => output[1].push(x));
                obj.memory.value.forEach((x: any) => output[2].push(x));
                const csvContent =
                  'data:text/csv;charset=utf-8,' +
                  output.map((e) => e.join(',')).join('\n');
                const encodedUri = encodeURI(csvContent);
                var link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', `${obj.Names}.csv`);
                document.body.appendChild(link);
                link.click();
                link.remove();
              }}
            >
              {obj.Names}
            </h2>
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
