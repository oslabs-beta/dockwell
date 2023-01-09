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

const containerController = {
  startContainer: () => {
    console.log('hi');
  },
};

module.exports = containerController;
