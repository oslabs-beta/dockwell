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
      const output = await axios.get(`/api/control/logs/${name}`);
      if (typeof output.data.stdout === 'object') {
        setLogs(output.data.stdout);
      } else {
        setLogs(output.data.stderr);
      }
    } catch (err) {
      const output = err;
      setLogs(output.data);
    }
  }

  let logsJSX = [<li key="">No LOGS</li>];
  const logsByMostRecent = [];
  if (logs !== null) {
    for (let i = logs.length - 1; i >= 0; i--) {
      logsByMostRecent.push(logs[i]);
    }
    logsJSX = logsByMostRecent.map((log, i) => (
      <li className="logs-list-item" key={i}>
        {' '}
        {typeof log === 'string' ? log : JSON.stringify(log)}
      </li>
    ));
  }

  return (
    <>
      {(props.activeContainers.length !== 0 ? true : false) && (
        <form>
          <br></br>
          <select
            className="dropdown"
            defaultValue={'DEFAULT'}
            onChange={(e) => {
              getLogs(e.target.value);
              setSelectedContainer(e.target.value);
            }}
          >
            <option value={'Default'}>Select to view Logs:</option>
            {props.activeContainers?.map((x, i) => {
              return (
                <option value={x.Names} key={i}>
                  {x.Names}
                </option>
              );
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
