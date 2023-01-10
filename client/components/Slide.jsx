import React, { useState, useEffect } from 'react';
//this will be the larger display of one of the users  docker containers with all the metrics displayed
const Slide = ({slideInfo}) => {
  const { Names, Status, memory, cpu } = slideInfo;

  console.log(slideInfo)

  return <div className="Slide">
    <h1>{Names}</h1>
    <h3>{Status}</h3>
  </div>;
};

export default Slide;
