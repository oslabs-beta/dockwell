import React, { useEffect, useState } from 'react';
//this will be small previews of the users individual docker containers with buttons to start and stop each one

const ImagePreview = () => {
  const dummyPreview = {
    name: 'docker-tutorial',
    state: 'exited',
    image: 'docker101tutorial',
    IPAddress: '172.17.0.4',
    PublishedPorts: '55000:9090',
    Created: '2021-01-04 12:43:05',
  };

  const { name, state, image, IPAddress, PublishedPorts, Created } =
    dummyPreview;
  console.log(name);
  return (
    <div className="ImagePreview">
      <div className="information">
        <p className="labels small">{`Created at: ${Created}`}</p>
        <p className="labels small">{`IP: ${IPAddress}`}</p>
        <p className="labels small">{`Published Ports: ${PublishedPorts}`}</p>
        <div className="space"></div>
        <p className="labels large">{`${name}`}</p>
        <p className="labels small">{`Image: ${image}`}</p>
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
