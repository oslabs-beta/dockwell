const { promisify } = require('util');
const { exec } = require('child_process');
const execProm = promisify(exec);
const cliParser = require('../utils/dockerCliParser');

const controlContainer = {};

controlContainer.dockerTaskName = async (req, res, next) => {
  try {
    const { name, task } = req.params;
    let { stdout, stderr } = await execProm(`docker ${task} ${name}`);
    stdout ? (stdout = cliParser(stdout)) : '';
    stderr ? (stderr = cliParser(stderr)) : '';
    res.locals.container = { stdout, stderr };
    return next();
  } catch (err) {
    return next({
      log:
        'controlContainer.dockerTaskName - error in the docker task containername command: ' +
        err,
      status: 500,
      message: {
        err: 'Expected metrics for running containers were not found',
      },
    });
  }
};

module.exports = controlContainer;
