const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PrometheusDriver = require('prometheus-query').PrometheusDriver;
const path = require('path');
const { response } = require('express');
const { useState } = require('react');
const app = express();

//METRICS QUERIES
// CPU - container_cpu_usage_seconds_total
// Memory - container_memory_usage_bytes
//need to find a way to grab container ids from docker
const PORT = 3535;
const queries = {
  avg_cpu:
    'avg by(job) (rate(process_cpu_seconds_total{job="prometheus"}[1m]))',
  rate_cpu: 'rate(process_cpu_seconds_total{job="prometheus"}[1m])',
  cpu: 'container_cpu_usage_seconds_total',
  memory: 'container_memory_usage_bytes',
};

app.use(cookieParser()).use(express.json()).use(cors());

//EXAMPLE PROM CLIENT

const prom = new PrometheusDriver({
  endpoint: 'http://localhost:9090',
  baseURL: '/api/v1', // default value
});

const q = queries['cpu'];
prom
  .instantQuery(q)
  .then((y) => {
    const series = y.result;
    const finalObj = {};
  })
  .catch(console.error);

// app.get('/api', (req, res) => {
//   const q = queries[req.params.q];
//   prom
//     .instantQuery(q)
//     .then((y) => {
//       const series = y.result;
//       const x = [];
//       series.forEach((serie) => {
//         console.log('============================', serie);
//         x.push(serie);
//         // !cache[serie.metric.metric?.name] ? cache[serie.metric.metric?.name] : '';
//         // console.log('Serie:', serie?.metric.toString());
//         // console.log('Time:', serie?.value.time);
//         // console.log('Value:', serie?.value.value);
//       });
//       console.log(x);
//       res.json(x);
//     })
//     .catch(console.error);
// });

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res, err) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  });
}

app.use('*', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use((err, _req, res) => {
  const defaultErr = {
    log: 'Caught Unknown middleware error.',
    status: 500,
    message: { err: 'An unknown error occured.' },
  };
  const { log, status, message } = Object.assign(defaultErr, err);
  console.log('ERROR: ', log);
  return res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
