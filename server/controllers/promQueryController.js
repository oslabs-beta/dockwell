//imports
const PrometheusDriver = require('prometheus-query').PrometheusDriver;

const { promisify } = require('util');
const { exec } = require('child_process');
const execProm = promisify(exec);
const cliParser = require('../serverUtils/dockerCliJS');
const { data } = require('autoprefixer');
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

promQueryController.cpuQuery = (req, res, next) => {
  console.log('server cpu query');
  const q = queries['cpu'];
  prom
    .instantQuery(q)
    .then((y) => {
      const series = y.result;
      const output = [];
      console.log(series);
      for (let metricObj of series) {
        console.log(metricObj);
        res.locals.containers[metricObj.metric.labels.id.substr(8, 12)]
          ? output.push(
              metricObj,
              res.locals.containers[metricObj.metric.labels.id.substr(8, 12)]
            )
          : '';
      }
      res.locals.data = output;
      return next();
    })
    .catch(console.error);
};
promQueryController.memoryQuery = (req, res, next) => {
  console.log('server memory query', res.locals.containers);
  const q = queries['memory'];
  prom
    .instantQuery(q)
    .then((y) => {
      const series = y.result;
      const output = [];
      console.log(series);
      for (let metricObj of series) {
        console.log(metricObj);
        res.locals.containers[metricObj.metric.labels.id.substr(8, 12)]
          ? output.push(
              metricObj,
              res.locals.containers[metricObj.metric.labels.id.substr(8, 12)]
            )
          : '';
      }
      res.locals.data = output;
      return next();
    })
    .catch(console.error);
};

promQueryController.getContainers = async (req, res, next) => {
  try {
    console.log('server testing...');
    const { stdout } = await execProm('docker ps --all --format "{{json .}}"');
    const data = cliParser(stdout).map((container) => {
      return {
        ID: container.ID,
        Names: container.Names,
        State: container.State,
      };
    });
    const finalData = {};
    for (let metricObj of data) {
      if (
        metricObj.Names !== 'prometheus' &&
        metricObj.Names !== 'cadvisor' &&
        metricObj.Names !== 'grafana'
      ) {
        finalData[metricObj.ID] = metricObj;
      }
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

module.exports = promQueryController;

//TODO
// on app launch - we run the docker cli command, parse, get an array of all the relevant containers
//on request, we make the metrics PROMQL request, get back a huge object, filter it by the important container ids, and then build out the object we re gonna send as a response.
