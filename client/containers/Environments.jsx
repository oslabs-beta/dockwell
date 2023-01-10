import React from 'react';
import ImagePreview from '../components/ImagePreview.jsx';
import App from '../pages/App.jsx';

const Environments = ({ allContainers }) => {
  // console.log(allContainers);

  const previewArray = allContainers.map((obj, i) => (
    <ImagePreview containerInfo={obj} key={'container ' + i} />
  ));

  return (
    <div className="Environments">
      <div className="EnvContainer">{previewArray}</div>
    </div>
  );
};

export default Environments;
