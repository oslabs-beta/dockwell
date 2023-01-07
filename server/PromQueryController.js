//imports
const PrometheusDriver = require('prometheus-query').PrometheusDriver;

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

PromQueryController.CPUQuery = (req, res, next) => {
  const q = queries['cpu'];
  prom
    .instantQuery(q)
    .then((y) => {
      const series = y.result;
      const finalObj = {};
    })
    .catch(console.error);
};
PromQueryController.MemoryQuery = (req, res, next) => {
  const q = queries['memory'];
  prom
    .instantQuery(q)
    .then((y) => {
      const series = y.result;
      const finalObj = {};
    })
    .catch(console.error);
};

module.exports = promQueryController;
