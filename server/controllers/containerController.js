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

//to run and start all you need is the name of the container

const controlContainer = async (req, res, next) => {
  try {
    const name = req.params.name;
    const task = req.params.task;
    await execProm(`docker ${task} ${name}`);
    return next();
  } catch (err) {
    console.log(err);
  }
};

// const containerController = {
//   startContainer: async (req, res, next) => {
//     try {
//       const name = req.params.name;
//       await execProm(`docker run ${name}`);
//       return next();
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   pauseContainer: async (req, res, next) => {
//     try {
//       const name = req.params.name;
//       await execProm(`docker pause ${name}`);
//       return next();
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   killContainer: async (req, res, next) => {
//     try {
//       const name = req.params.name;
//       await execProm(`docker kill ${name}`);
//       return next();
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };

module.exports = controlContainer;
