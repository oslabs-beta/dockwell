import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

const {
  cpuQuery,
  memoryQuery,
  getContainers,
  getContainerState,
  getTotals,
  memFailuresQuery,
  healthFailureQuery,
} = require('./controllers/promQueryController.ts');
const controlContainer = require('./controllers/containerController.ts');
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
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.containers);
  }
);

app.get(
  '/api/control/:task/:name',
  controlContainer.dockerTaskName,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.container);
  }
);

app.get('/', (req: Request, res: Response) => {
  console.log('sending file');
  res.sendFile('../../build/index.html');
});

//404 handler
app.use((req: Request, res: Response) => {
  return res.sendStatus(404);
});

//global error handler
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
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
  console.log(`Dockwell server listening on ${PORT}`);
});
