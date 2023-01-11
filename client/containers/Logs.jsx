import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Logs = (props) => {
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [logs, setLogs] = useState(null);

  async function getLogs(name) {
    try {
      let output = await axios.get(
        `http://localhost:3535/api/control/logs/${name}`
      );
      // let temp = ''
      // for(let x of Object.keys(output.data)){
      //   temp += output.data[x].forEach(x=>{
      //   temp+=x
      //   temp+='<br></br>'
      // })
      // }
      // console.log(temp)
      setLogs(output);
    } catch (err) {
      const output = err;
      setLogs(output);
    }
  }

  return (
    <>
      {/* <h1>Logs</h1> */}
      {(props.activeContainers.length !== 0 ? true : false) && (
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Select a container to view logs:
            <br></br>
            <select
              value={null}
              onChange={(e) => {
                getLogs(e.target.value);
                setSelectedContainer(e.target.value);
              }}
            >
              <option value={null}></option>
              {props.activeContainers?.map((x) => {
                return <option value={x.Names}>{x.Names}</option>;
              })}
            </select>
          </label>
        </form>
      )}
      {(logs ? true : false) && <p>{JSON.stringify(logs)}</p>}
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
    </>
  );
};
export default Logs;
