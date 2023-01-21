const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PrometheusDriver = require('prometheus-query').PrometheusDriver;
const path = require('path');

const app = express();

const {
  cpuQuery,
  memoryQuery,
  getContainers,
  getTotals,
  memFailuresQuery,
  healthFailureQuery,
} = require('./controllers/promQueryController');
const controlContainer = require('./controllers/containerController');
const PORT = 3535;

app.use(cookieParser()).use(express.json()).use(cors());

app.get('/api/getContainers', getContainers, (req, res) => {
  // console.log('containers', res.locals.containers);
  res.status(200).json(res.locals.containers);
});

app.get('/api/getFastStats', getContainers, (req, res) => {
  // console.log('fast', res.locals.containers);
  res.status(200).json(res.locals.containers);
});

app.get(
  '/api/getStats',
  getContainers,
  memoryQuery,
  cpuQuery,
  memFailuresQuery,
  getTotals,
  healthFailureQuery,
  (req, res) => {
    // console.log('stats', res.locals.containers);
    res.status(200).json(res.locals.finalResult);
  }
);

app.get(
  '/api/control/:task/:name',
  controlContainer.dockerTaskName,
  (req, res) => {
    res.status(200).json(res.locals.container);
  }
);

app.use('/', express.static(path.join(__dirname, '../../build')));

app.use((err, _req, res, next) => {
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
