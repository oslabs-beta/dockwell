import React, { useEffect, useState } from 'react';
//this will be small previews of the users individual docker containers with buttons to start and stop each one

const ImagePreview = ({containerInfo}) => {
  const {Names, State, Ports, CreatedAt, Image, Status} = containerInfo

  return (
    <div className="ImagePreview">
      <div className="information">
        <p className="labels small">{`Created at: ${CreatedAt}`}</p>
        <p className="labels small">{`IP: 27.044.2391`}</p>
        <p className="labels small">{`Published Ports: ${Ports}`}</p>
        <div className="space"></div>
        <p className="labels large">{`${Names}`}</p>
        <p className="labels small">{`Image: ${Image}`}</p>
      </div>
      <div id="buttons">
        <button
          type="button"
          className="btn btn-success"
          data-toggle="button"
          aria-pressed="false"
          autoComplete="off"
        >
          Start
        </button>
        <button
          type="button"
          className="btn btn-danger"
          data-toggle="button"
          aria-pressed="false"
          autoComplete="off"
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
