//imports
const { promisify } = require('util');
const { exec } = require('child_process');
const execProm = promisify(exec);
const cliParser = require('../serverUtils/dockerCliJS');

const controlContainer = {};

// controlContainer.dockerTaskName2 = async (req, res, next) => {
//   try {
//     const name = req.params.name;
//     const task = req.params.task;
//     await execProm(`docker ${task} ${name}`);
//     return next();
//   } catch (err) {
//     console.log(err);
//   }
// };

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
