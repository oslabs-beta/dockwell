import React from 'react';

const Legend = ({ names }: { names: String[] }) => {
  const namesArray: JSX.Element[] = [];
  for (let i = 0; i < names.length; i++) {
    names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1);
  }
  for (let i = 0; i < names.length; i++) {
    namesArray.push(
      <div className={`legendItem${i + 1}`} key={i}>
        {names[i]}
      </div>
    );
  }

  return <div className="legendInner">{namesArray}</div>;
};

export default Legend;
