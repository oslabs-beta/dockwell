import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

//this will be the larger display of one of the users  docker containers with all the metrics displayed
// const Slide = ({ slideInfo }) => {
//   const { Names, Status, memory, cpu } = slideInfo;

class Slide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'series 1',
          data: [
            {
              x: '12-02-2002',
              y: 0,
            },
            {
              x: '12-03-2002',
              y: 51,
            },
            {
              x: '12-04-2002',
              y: 100,
            },
          ].slice(), //unknown variable
        },
      ],
      options: {
        chart: {
          id: 'realtime',
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: 'Dynamic Updating Chart',
          align: 'left',
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'datetime',
          range: 100, //unknown variable
        },
        yaxis: {
          max: 100,
        },
        legend: {
          show: false,
        },
      },
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      Chart.getNewSeries(lastDate, {
        //unknown variable
        min: 10,
        max: 90,
      });

      ApexCharts.exec('realtime', 'appendSeries', [
        {
          data: [
            {
              x: '12-05-2002',
              y: 0,
            },
            {
              x: '12-06-2002',
              y: 51,
            },
            {
              x: '12-07-2002',
              y: 100,
            },
          ],
        },
      ]);
    }, 1000);
  }

  render() {
    return (
      // <div className="app">
      //   <div className="row">
      <div className="mixed-chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          width="500"
        />
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          width="500"
        />
      </div>
      //   </div>
      // </div>
    );
  }
}

export default Slide;
