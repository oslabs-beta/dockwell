const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

const PORT = 3000;

app.use(cookieParser()).use(express.json()).use(cors());

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
