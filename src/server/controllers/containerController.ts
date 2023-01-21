//imports
import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import { exec } from "child_process";
const execProm = promisify(exec);
import cliParser from "../serverUtils/dockerCliJS";

export const controlContainer = {
  dockerTaskName: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, task } = req.params;
      //stdout and err inherntly have type string but typing it as string or string[] doesnt work
      let stdout: any, stderr: any;
      ({ stdout, stderr } = await execProm(`docker ${task} ${name}`));
      stdout && (stdout = cliParser(stdout));
      stderr && (stderr = cliParser(stderr));
      res.locals.container = { stdout, stderr };
      return next();
    } catch (err) {
      console.log(err);
    }
  },
};

export default controlContainer;
