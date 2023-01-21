//imports
const PrometheusDriver = require("prometheus-query").PrometheusDriver;
import { NextFunction, Request, Response } from "express";
const { promisify } = require("util");
const { exec } = require("child_process");
const execProm = promisify(exec);
const cliParser = require("../serverUtils/dockerCliJS");
const { Metric } = require("prometheus-query");

// default options
const options = {
  machineName: null, // uses local docker
  currentWorkingDirectory: null, // uses current working directory
  echo: true, // echo command output to stdout/stderr
};

//query driver config
const prom = new PrometheusDriver({
  endpoint: "http://localhost:9090",
  baseURL: "/api/v1", // default value
});

const queries = {
  cpu: "rate(container_cpu_usage_seconds_total[1m])",
  memory: "container_memory_usage_bytes",
  memFailures: "container_memory_failures_total",
  healthFailures: "engine_daemon_health_checks_failed_total",
  transmitErrs: "container_network_transmit_errors_total",
  receiveErrs: "container_network_receive_errors_total",
};

const promQueryController = {
  //to grab all the containers and their status in docker and formating that into an object of objects, where each object has the info on each container from the docker cli command docker ps
  getContainers: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      //executes command in user's terminal
      const { stdout } = await execProm(
        'docker ps --all --format "{{json .}}"',
      );
      //parse incoming data
      const data = cliParser(stdout).map(
        (
          container: {
            ID: string;
            Names: string;
            State: string;
            Ports: string;
            CreatedAt: string;
            Image: string;
            Status: string;
          },
        ) => {
          return ({
            ID: container.ID,
            Names: container.Names,
            State: container.State,
            Ports: container.Ports,
            CreatedAt: container.CreatedAt,
            Image: container.Image,
            Status: container.Status,
          });
        },
      );

      //goes through the array from the map above, and creates an object where each key is a container ID, and the value is the object created in the step above.
      const finalData: { [key: string]: { Names: string; ID: string } } = {};
      for (let metricObj of data as Array<{ Names: string; ID: string }>) {
        if (
          metricObj.Names !== "prometheus" && metricObj.Names !== "cadvisor"
        ) {
          finalData[metricObj.ID] = metricObj;
        }
      }

      res.locals.containers = finalData;
      return next();
    } catch (err) {
      return next({
        log: `error ${err} occurred in stopContainer`,
        message: { err: "an error occured" },
      });
    }
  },

  cpuQuery: (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { containers } = res.locals;
    prom
      .instantQuery(queries["cpu"])
      .then(
        (
          data: {
            result: Array<
              {
                metric: { labels: { id: string } };
                value: { time: string; value: number };
              }
            >;
          },
        ) => {
          const series = data.result;
          for (let metricObj of series) {
            const short_id = metricObj.metric.labels.id.substr(8, 12);
            containers[short_id] &&
              (containers[short_id].cpu = {
                time: [metricObj.value.time.toString().slice(16, 24)],
                value: [metricObj.value.value],
              });
          }
          return next();
        },
      )
      .catch(console.error);
  },
  memoryQuery: (req: Request, res: Response, next: NextFunction) => {
    const q = queries["memory"];
    const { containers } = res.locals;
    prom
      .instantQuery(q)
      .then((data: {
        result: Array<
          {
            metric: { labels: { id: string } };
            value: { time: string; value: number };
          }
        >;
      }) => {
        const series = data.result;
        for (let metricObj of series) {
          const short_id = metricObj.metric.labels.id.substr(8, 12);
          containers[short_id] &&
            (containers[short_id].memory = {
              time: [metricObj.value.time.toString().slice(16, 24)],
              value: [(metricObj.value.value / 1000000).toFixed(3)],
            });
        }
        return next();
      })
      .catch(console.error);
  },

  memFailuresQuery: (req: Request, res: Response, next: NextFunction) => {
    const q = queries["memFailures"];
    const { containers } = res.locals;

    prom
      .instantQuery(q)
      .then((data: {
        result: Array<
          {
            metric: { labels: { id: string } };
            value: { time: string; value: number };
          }
        >;
      }) => {
        const series = data.result;
        for (let metricObj of series) {
          // console.log(metricObj);
          const short_id = metricObj.metric.labels.id.substr(8, 12);
          //if substring is a key in getcontainers object
          containers[short_id] &&
            (containers[short_id].memFailures = {
              value: [metricObj.value.value],
            });
        }
        return next();
      })
      .catch(console.error);
  },

  getTotals: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { stdout } = await execProm(
        'docker stats --no-stream --format "{{json .}}"',
      );
      const data = cliParser(stdout).map(
        (
          container: {
            ID: string;
            Name: string;
            CPUPerc: number;
            MemPerc: number;
            MemUsage: number;
          },
        ) => {
          return {
            ID: container.ID,
            Name: container.Name,
            CPUPercentage: container.CPUPerc,
            MemPercentage: container.MemPerc,
            MemUsage: container.MemUsage,
          };
        },
      );
      // console.log(stdout);
      const totalsFinal = {
        totalCpuPercentage: 0,
        totalMemPercentage: 0,
        memLimit: "0GiB",
      };
      for (let container of data) {
        let memStr = container.MemPercentage.replace("%", "");
        let cpuStr = container.CPUPercentage.replace("%", "");
        totalsFinal.totalMemPercentage += Number(memStr);
        totalsFinal.totalCpuPercentage += Number(cpuStr);
      }
      const memLimit = data[0].MemUsage.split("/");
      totalsFinal.memLimit = memLimit[1];
      res.locals.finalResult = {
        totals: totalsFinal,
        ...res.locals.containers,
      };

      return next();
    } catch (err) {
      return next({
        log: `error ${err} occurred in stopContainer`,
        message: { err: "an error occured" },
      });
    }
  },
  healthFailureQuery: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const q = queries["healthFailures"];
    const { finalResult } = res.locals;
    prom
      .instantQuery(q)
      .then((data: { result: { value: { value: number } }[] }) => {
        // console.log(data.result[0].value.value);
        finalResult.totals.dockerHealthFailures = data.result[0].value.value;
        return next();
      })
      .catch(console.error);
  },
};
export default promQueryController;
