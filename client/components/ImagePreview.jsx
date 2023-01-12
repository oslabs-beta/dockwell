import React, { useEffect, useState } from 'react';
import axios from 'axios';

//this will be small previews of the users individual docker containers with buttons to start and stop each one

const ImagePreview = ({obj}) => {
  let { Names, State, Ports, CreatedAt, Image, Status } = obj;

  let date = CreatedAt.substring(0, 19);
  let port = Ports.substring(8, 18);
  // let state = State[0].toUpperCase() + State.substring(1);

  let badgeColor;

  const toggleClick = (cmd) => {
    State === 'paused' && cmd === 'start' ? (cmd = 'unpause') : '';
    axios
      .get(`http://localhost:3535/api/control/${cmd}/${Names}`)
      .then((data) => {
        console.log(`${Names} was ${cmd}`);
      })
      .catch((err) => {
        console.error('error');
      });
  };
  
  if (State === 'running') {
    badgeColor = 'blueBadge';  
  } else if (State === 'exited') {
    badgeColor = 'redBadge'; 
  } else if (State === 'paused') { 
    badgeColor = 'greyBadge'; 
  } 

  return (
    <div className="ImagePreview"> 

      <div className="information">
        <div className={badgeColor}>
          <p className="labels small">{`${State}`}</p>
        </div>
        <p className="labels small">{`Created at: ${date}`}</p>
        <p className="labels small">{`Published Ports: ${[port]}`}</p>
        <div className="space"></div>
        <p className="labels large">{`${Names}`}</p>
        <p className="labels small">{`Image: ${Image}`}</p>
      </div>
      <div id="buttons">
        {(State === 'stopped' || State === 'exited' || State === 'paused') && (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              toggleClick('start');
            }}
            data-toggle="button"
            aria-pressed="false"
            autoComplete="off"
          >
            Start
          </button>
        )}
        {State === 'running' && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              toggleClick('pause');
            }}
            data-toggle="button"
            aria-pressed="false"
            autoComplete="off"
          >
            Pause
          </button>
        )}
        {(State === 'running' || State === 'paused') && (
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              toggleClick('stop');
            }}
            data-toggle="button"
            aria-pressed="false"
            autoComplete="off"
          >
            Stop
          </button>
        )}
        {(State === 'running' || State === 'paused') && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              toggleClick('kill');
            }}
            data-toggle="button"
            aria-pressed="false"
            autoComplete="off"
          >
            Kill
          </button>
        )}

        {/* <button
          type="button"
          className='btn btn-warning'
          // onClick={toggleClick}
          data-toggle="button"
          aria-pressed="false"
          autoComplete="off"
        >Pause</button> */}
      </div>
    </div>
  );
};

export default ImagePreview;
