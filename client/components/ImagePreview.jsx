import React, { useEffect, useState } from 'react';
//this will be small previews of the users individual docker containers with buttons to start and stop each one

const ImagePreview = ({containerInfo}) => {
  const {Names, State, Ports, CreatedAt, Image, Status} = containerInfo
  let date = CreatedAt.substring(0, 19)
  let port = Ports.substring(8,18)
  let state = State[0].toUpperCase()+State.substring(1)
  let badgeColor;
  if (state === 'Running') {
    badgeColor ="blueBadge"
  } else if (state === 'Exited') {
    badgeColor = "redBadge";
  } else {
    badgeColor = "yellowBadge";

  }
  return (
    <div className="ImagePreview">
      <div className="information">
        <div className={badgeColor}>
          <p className="labels small">{`${state}`}</p>
        </div>
        <p className="labels small">{`Created at: ${date}`}</p>
        <p className="labels small">{`Published Ports: ${[port]}`}</p>
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
