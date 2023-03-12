const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

const {
  cpuQuery,
  memoryQuery,
  getContainers,
  getContainerState,
  getTotals,
  memFailuresQuery,
  healthFailureQuery,
} = require('./controllers/promQueryController');
const controlContainer = require('./controllers/containerController');
const PORT = 3535;

app.use(cookieParser()).use(express.json()).use(cors());

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/api/getFastStats', getContainers, getContainerState, (req, res) => {
  res.status(200).json(res.locals.containers);
});

app.get('/api/getTotals', getTotals, healthFailureQuery, (req, res) => {
  res.status(200).json(res.locals.finalResult.totals);
});

app.get(
  '/api/getStats',
  getContainers,
  getContainerState,
  memoryQuery,
  cpuQuery,
  memFailuresQuery,
  (req, res) => {
    res.status(200).json(res.locals.containers);
  }
);

app.get(
  '/api/control/:task/:name',
  controlContainer.dockerTaskName,
  (req, res) => {
    res.status(200).json(res.locals.container);
  }
);

//404 handler
app.get((req, res) => {
  return res.sendStatus(404);
});

//global error handler
app.use((err, _req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middleware error',
    status: 500,
    message: { err: 'An unknown server error occured.' },
  };
  const { log, status, message } = Object.assign(defaultErr, err);
  console.log('ERROR: ', log);
  return res.status(status).json(message);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
