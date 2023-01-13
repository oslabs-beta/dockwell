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
  blkioUsage: 'container_blkio_device_usage_total',
  memCache: 'container_memory_cache',
};

const promQueryController = {};

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
          res.locals.containers[short_id]
          ? (res.locals.containers[short_id].ccpu = {
              time: [metricObj.value.time.toString().slice(16, 24)],
              value: [metricObj.value.value],
            })
          : '';
      }
      return next();
    })
    .catch(console.error);
};
 

promQueryController.blkioUsage = (req, res, next) => {
  const q = queries['blkioUsage'];
  prom
    .instantQuery(q)
    .then((y) => {
      const series = y.result;
      for (let metricObj of series) {
        const short_id = metricObj.metric.labels.id.substr(8, 12);
        res.locals.containers[short_id]
          ? (res.locals.containers[short_id].blkio = {
              time: [metricObj.value.time.toString().slice(16, 24)],
              value: [metricObj.value.value],
            })
          : '';
      }
      return next();
    })
    .catch(console.error);
};

promQueryController.memCache = (req, res, next) => {
  const q = queries['memCache'];
  prom
    .instantQuery(q)
    .then((y) => {
      const series = y.result;
      for (let metricObj of series) {
        const short_id = metricObj.metric.labels.id.substr(8, 12);
        res.locals.containers[short_id]
          ? (res.locals.containers[short_id].memCache = {
              time: [metricObj.value.time.toString().slice(16, 24)],
              value: [metricObj.value.value],
            })
          : '';
      }
      return next();
    })
    .catch(console.error);
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
    console.log(stdout);
    const totalsFinal = {
      totalCpuPercentage: 0,
      totalMemPercentage: 0,
      memLimit: '0GiB',
    };
    for (let container of data) {
      let memStr = container.MemPercentage.replace('%', '');
      let cpuStr = container.CPUPercentage.replace('%', '');
      totalsFinal.totalMemPercentage += Number(memStr);
      totalsFinal.totalCpuPercentage += Number(cpuStr);
    }
    const memLimit = data[0].MemUsage.split('/');
    totalsFinal.memLimit = memLimit[1];
    res.locals.finalResult = { totals: totalsFinal, ...res.locals.containers };

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
