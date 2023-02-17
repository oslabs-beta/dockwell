const { promisify } = require('util');
const { exec } = require('child_process');
const execProm = promisify(exec);
const cliParser = require('../utils/dockerCliParser');
const { Metric } = require('prometheus-query');
const { container } = require('webpack');

const PrometheusDriver = require('prometheus-query').PrometheusDriver;

// default options
const options = {
  machineName: null, // uses local docker
  currentWorkingDirectory: null, // uses current working directory
  echo: true, // echo command output to stdout/stderr
};

// for use when app is run locally, sans container:
// const endpoint = 'http://localhost:9090';

// for use when hosted in a container (localhost of a given docker container):
const endpoint = 'http://host.docker.internal:9090';

const prom = new PrometheusDriver({
  endpoint: endpoint,
  baseURL: '/api/v1', // default value
});

const queries = {
  cpu: 'rate(container_cpu_usage_seconds_total[1m])',
  memory: 'container_memory_usage_bytes',
  memFailures: 'container_memory_failures_total',
  healthFailures: 'engine_daemon_health_checks_failed_total',
  transmitErrs: 'container_network_transmit_errors_total',
  receiveErrs: 'container_network_receive_errors_total',
};

const promQueryController = {};

//to grab all the containers and their status in docker and formating that into an object of objects, where each object has the info on each container from the docker cli command docker ps
promQueryController.getContainers = async (req, res, next) => {
  try {
    //executes command in user's terminal
    const { stdout } = await execProm('docker ps --all --format "{{json .}}"');
    //parse incoming data
    const data = cliParser(stdout).map((container) => {
      return {
        ID: container.ID,
        Names: container.Names,
        Ports: container.Ports,
        CreatedAt: container.CreatedAt,
        Image: container.Image,
        Status: container.Status,
      };
    });
    //goes through the array from the map above, and creates an object where each key is a container ID, and the value is the object created in the step above.
    const finalData = {};
    for (const metricObj of data) {
      if (
        true
        // metricObj.Names !== 'prometheus' &&
        // metricObj.Names !== 'cadvisor' &&
        // metricObj.Names !== 'dockwell-dev'
        // metricObj.Names !== 'dockwell'
      ) {
        finalData[metricObj.ID] = metricObj;
      }
    }

    res.locals.containers = finalData;
    return next();
  } catch (err) {
    return next({
      log:
        'promQLController.getContainers - error in the docker ps --all format JSON command: ' +
        err,
      status: 500,
      message: {
        err: 'Expected metrics for running containers were not found',
      },
    });
  }
};

promQueryController.getContainerState = async (req, res, next) => {
  try {
    for (const container in res.locals.containers) {
      const { stdout } = await execProm(
        `docker inspect ${res.locals.containers[container].Names} --format "{{json .}}"`
      );
      const data = cliParser(stdout);
      const containerState = data[0].State.Status;
      res.locals.containers[container].State = containerState;
    }
    return next();
  } catch (err) {
    return next({
      log: 'promQLController.getContainerState - error in the docker inspect containername command',
      status: 500,
      message: { err },
    });
  }
};

promQueryController.cpuQuery = (req, res, next) => {
  const q = queries['cpu'];
  const { containers } = res.locals;
  prom
    .instantQuery(q)
    .then((data) => {
      const series = data.result;
      for (const metricObj of series) {
        const short_id = metricObj.metric.labels.id.substr(8, 12);
        containers[short_id] &&
          (containers[short_id].cpu = {
            time: [metricObj.value.time.toString().slice(16, 24)],
            value: [metricObj.value.value],
          });
      }
      if (containers) {
        for (const key in containers) {
          if (!containers[key].cpu)
            res.locals.containers[key].cpu = { time: ['00:00:00'], value: [0] };
        }
      }
      return next();
    })
    .catch((err) => {
      return next({
        log:
          'promQLController.cpuQuery - error in the promQL CPU query: ' + err,
        status: 500,
        message: {
          err: 'Expected metrics for running containers were not found',
        },
      });
    });
};

promQueryController.memoryQuery = (req, res, next) => {
  const q = queries['memory'];
  const { containers } = res.locals;
  prom
    .instantQuery(q)
    .then((y) => {
      const series = y.result;
      for (const metricObj of series) {
        const short_id = metricObj.metric.labels.id.substr(8, 12);
        containers[short_id] &&
          (containers[short_id].memory = {
            time: [metricObj.value.time.toString().slice(16, 24)],
            value: [(metricObj.value.value / 1000000).toFixed(3)],
          });
      }
      if (containers) {
        for (const key in containers) {
          if (!containers[key].memory)
            res.locals.containers[key].memory = {
              time: ['00:00:00'],
              value: [0],
            };
        }
      }
      return next();
    })
    .catch((err) => {
      return next({
        log:
          'promQLController.memoryQuery - error in the promQL MEMORY query: ' +
          err,
        status: 500,
        message: {
          err: 'Expected metrics for running containers were not found',
        },
      });
    });
};

promQueryController.memFailuresQuery = (req, res, next) => {
  const q = queries['memFailures'];
  const { containers } = res.locals;
  prom
    .instantQuery(q)
    .then((data) => {
      const series = data.result;
      for (const metricObj of series) {
        const short_id = metricObj.metric.labels.id.substr(8, 12);
        //if substring is a key in getcontainers object
        containers[short_id] &&
          (containers[short_id].memFailures = {
            value: [metricObj.value.value],
          });
      }
      if (containers) {
        for (const key in containers) {
          if (!containers[key].memFailures)
            res.locals.containers[key].memFailures = {
              value: [0],
            };
        }
      }
      return next();
    })
    .catch((err) => {
      return next({
        log:
          'promQLController.memFailuresQuery - error in the promQL MEM FAILURES query: ' +
          err,
        status: 500,
        message: {
          err: 'Expected metrics for running containers were not found',
        },
      });
    });
};

promQueryController.getTotals = async (req, res, next) => {
  try {
    const { stdout } = await execProm(
      'docker stats --no-stream --format "{{json .}}"'
    );
    const data = cliParser(stdout).map((container) => {
      return {
        ID: container.ID,
        Name: container.Name,
        CPUPercentage: container.CPUPerc,
        MemPercentage: container.MemPerc,
        MemUsage: container.MemUsage,
      };
    });
    const totalsFinal = {
      totalCpuPercentage: 0,
      totalMemPercentage: 0,
      memLimit: '0GiB',
    };
    for (const container of data) {
      if (
        true
        // container.Name !== 'prometheus' &&
        // container.Name !== 'cadvisor' &&
        // container.Name !== 'dockwell-dev'
        // container.Name !== 'dockwell'
      ) {
        const memStr = container.MemPercentage.replace('%', '');
        const cpuStr = container.CPUPercentage.replace('%', '');
        totalsFinal.totalMemPercentage += Number(memStr);
        totalsFinal.totalCpuPercentage += Number(cpuStr);
      }
    }
    const memLimit = data[0].MemUsage.split('/');
    totalsFinal.memLimit = memLimit[1];
    res.locals.finalResult = { totals: totalsFinal };

    return next();
  } catch (err) {
    return next({
      log: 'promQLController.getTotals - error in the parser: ' + err,
      status: 500,
      message: {
        err: 'Expected metrics for running containers were not found',
      },
    });
  }
};

promQueryController.healthFailureQuery = async (req, res, next) => {
  const q = queries['healthFailures'];
  const { finalResult } = res.locals;
  prom
    .instantQuery(q)
    .then((data) => {
      finalResult.totals.dockerHealthFailures = data.result[0].value.value;
      return next();
    })
    .catch((err) => {
      return next({
        log:
          'promQLController.healthFailureQuery - error in the promQL HEALTH FAILURES query: ' +
          err,
        status: 500,
        message: {
          err: 'Expected metrics for running containers were not found',
        },
      });
    });
};

module.exports = promQueryController;
