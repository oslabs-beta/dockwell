//imports
const PrometheusDriver = require('prometheus-query').PrometheusDriver;

const { promisify } = require('util');
const { exec } = require('child_process');
const execProm = promisify(exec);
const cliParser = require('../serverUtils/dockerCliJS');
const { Metric } = require('prometheus-query');

// default options
const options = {
  machineName: null, // uses local docker
  currentWorkingDirectory: null, // uses current working directory
  echo: true, // echo command output to stdout/stderr
};

//query driver config
const prom = new PrometheusDriver({
  endpoint: 'http://localhost:9090',
  baseURL: '/api/v1', // default value
});

const queries = {
  cpu: 'container_cpu_usage_seconds_total',
  memory: 'container_memory_usage_bytes',
};

const promQueryController = {};

promQueryController.memoryQuery = (req, res, next) => {
  const q = queries['memory'];
  prom
    .instantQuery(q)
    .then((y) => {
      const series = y.result;
      for (let metricObj of series) {
        const short_id = metricObj.metric.labels.id.substr(8, 12);
        res.locals.containers[short_id]
          ? (res.locals.containers[short_id].memory = {
              time: [metricObj.value.time.toString().slice(16, 24)],
              value: [metricObj.value.value],
            })
          : '';
      }
      return next();
    })
    .catch(console.error);
};

promQueryController.cpuQuery = (req, res, next) => {
  const q = queries['cpu'];
  prom
    .instantQuery(q)
    .then((y) => {
      const series = y.result;
      for (let metricObj of series) {
        const short_id = metricObj.metric.labels.id.substr(8, 12);
        res.locals.containers[short_id]
          ? (res.locals.containers[short_id].cpu = {
              time: [metricObj.value.time.toString().slice(16, 24)],
              value: [metricObj.value.value],
            })
          : '';
      }
      return next();
    })
    .catch(console.error);
};

promQueryController.getContainers = async (req, res, next) => {
  try {
    const { stdout } = await execProm('docker ps --all --format "{{json .}}"');
    const data = cliParser(stdout).map((container) => {
      return {
        ID: container.ID,
        Names: container.Names,
        State: container.State,
        Ports: container.Ports,
        CreatedAt: container.CreatedAt,
        Image: container.Image,
        Status: container.Status,
      };
    });
    const finalData = {};
    for (let metricObj of data) {
      // if (metricObj.Names !== 'prometheus' && metricObj.Names !== 'cadvisor') {
      finalData[metricObj.ID] = metricObj;
      // }
    }

    res.locals.containers = finalData;
    return next();
  } catch (err) {
    return next({
      log: `error ${err} occurred in stopContainer`,
      message: { err: 'an error occured' },
    });
  }
};

promQueryController.getTotals = async (req, res, next) => {
  try {
    const { stdout } = await execProm(
      'docker stats --no-stream --format "{{json .}}"'
    );
    const data = cliParser(stdout).map((container) => {
      return {
        ID: container.ID,
        CPUPercentage: CPUPerc,
      };
    });
    console.log(stdout);
    // console.log('howdy');
    // cliParser(stdout);

    return next();
  } catch (err) {
    return next({
      log: `error ${err} occurred in stopContainer`,
      message: { err: 'an error occured' },
    });
  }
};

module.exports = promQueryController;

//TODO
// on app launch - we run the docker cli command, parse, get an array of all the relevant containers
//on request, we make the metrics PROMQL request, get back a huge object, filter it by the important container ids, and then build out the object we re gonna send as a response.
