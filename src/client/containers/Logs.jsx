import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Logs = (props) => {
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [logs, setLogs] = useState(null);

  async function getLogs(name) {
    try {
      if (!name) {
        setLogs(null);
        return;
      }
      let output = await axios.get(`/api/control/logs/${name}`);
      if (typeof output.data.stdout === 'object') {
        setLogs(output.data.stdout);
      } else {
        setLogs(output.data.stderr);
      }
    } catch (err) {
      const output = err;
      setLogs(output);
    }
  }

  let logsJSX = [<li>No LOGS</li>];
  if (logs !== null) {
    logsJSX = logs.map((log) => <li className="logs-list-item"> {log}</li>);
  }

  return (
    <>
      {(props.activeContainers.length !== 0 ? true : false) && (
        <form>
          <br></br>
          <select
            className="dropdown"
            placeholder="Select to view logs:"
            defaultValue={null}
            onChange={(e) => {
              getLogs(e.target.value);
              setSelectedContainer(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Select to view logs:
            </option>
            <option value={null}></option>
            {props.activeContainers?.map((x) => {
              return <option value={x.Names}>{x.Names}</option>;
            })}
          </select>
          {(selectedContainer ? true : false) && (
            <input
              type="submit"
              value="Refresh Logs"
              onClick={(e) => {
                e.preventDefault();
                getLogs(selectedContainer);
              }}
            />
          )}
        </form>
      )}
      {(logs ? true : false) && <ul className="logs-list"> {logsJSX}</ul>}
    </>
  );
};
export default Logs;
