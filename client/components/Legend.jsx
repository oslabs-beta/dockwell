import React from 'react';

const Legend = ({ names }) => {
  const namesArray = names;
  return (
    <div height={50} className="legendItem">
      {namesArray}
    </div>
  );
};

export default Legend;
