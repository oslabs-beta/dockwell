const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PrometheusDriver = require('prometheus-query').PrometheusDriver;
const path = require('path');
// const { response } = require('express');

const app = express();

const {
  cpuQuery,
  memoryQuery,
  getContainers,
  getTotals,
} = require('./controllers/promQueryController');
const controlContainer = require('./controllers/containerController.js');
const PORT = 3535;

app.use(cookieParser()).use(express.json()).use(cors());

app.get('/api/getTotals', getTotals, (req, res, next) => {
  res.status(200).json('res.locals.totals');
});

app.get('/api/getContainers', getContainers, (req, res) => {
  res.status(200).json(res.locals.containers);
});

// app.get('/api/cpu', getContainers, cpuQuery, (req, res) => {
//   res.status(200).json(res.locals.data);
// });

// app.get('/api/getTotals', (req, res) => {
//   res.status(200).json(res.locals.data);
// });

app.get('/api/getStats', getContainers, memoryQuery, cpuQuery, (req, res) => {
  console.log(res.locals.containers);
  res.status(200).json(res.locals.containers);
});

app.get('/api/control/:task/:name', controlContainer, (req, res) => {
  res.sendStatus(200);
});

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
