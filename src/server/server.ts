import express, { NextFunction, Request, Response } from "express";
import { ServerError } from "../../types";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
// const PrometheusDriver = require("prometheus-query").PrometheusDriver;
import controlContainer from "./controllers/containerController";
const PORT = 3535;
const app = express();

//import middleware functions
const {
  cpuQuery,
  getContainers,
  getTotals,
  healthFailureQuery,
  memFailuresQuery,
  memoryQuery,
} = require ("./controllers/promQueryController");

app.use(cookieParser()).use(express.json()).use(cors());

//responds to calls from environments for simple stats (container names etc..)
app.get("/api/getFastStats", getContainers, (_req: Request, res: Response) => {
  res.status(200).json(res.locals.containers);
});

//responds with all metrics and container data
app.get(
  "/api/getStats",
  getContainers,
  memoryQuery,
  cpuQuery,
  memFailuresQuery,
  getTotals,
  healthFailureQuery,
  (_req, res) => {
    // console.log(res.locals.containers);
    res.status(200).json(res.locals.finalResult);
  },
);

//Start stop containers
app.get(
  "/api/control/:task/:name",
  controlContainer.dockerTaskName,
  (_req, res) => {
    res.status(200).json(res.locals.container);
  },
);
//Responds with main app
app.use("/", express.static(path.join(__dirname, "../../build")));

app.use(
  (err: ServerError, _req: Request, res: Response, _next: NextFunction) => {
    const defaultErr = {
      log: "Caught Unknown middleware error.",
      status: 500,
      message: { err: "An unknown error occured." },
    };
    const { log, status, message } = Object.assign(defaultErr, err);
    console.log("ERROR: ", log);
    return res.status(status).send(message);
  },
);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
