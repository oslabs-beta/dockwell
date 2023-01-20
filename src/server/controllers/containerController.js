//imports
const { promisify } = require('util');
const { exec } = require('child_process');
const execProm = promisify(exec);
const cliParser = require('../serverUtils/dockerCliJS');

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
    console.log(err);
  }
};

module.exports = controlContainer;
