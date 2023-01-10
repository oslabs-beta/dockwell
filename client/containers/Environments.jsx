import React from 'react';
import ImagePreview from '../components/ImagePreview.jsx';
<<<<<<< HEAD
import App from '../pages/App.jsx';

const Environments = ({ allContainers }) => {
  console.log(allContainers);

  const previewArray = allContainers.map((obj, i) => (
    <ImagePreview containerInfo={obj} key={'container ' + i} />
  ));

  return (
    <div className="Environments">
      <div className="EnvContainer">{previewArray}</div>
=======
import App from '../pages/App.jsx'


const Environments = ({ allContainers }) => {

  // console.log(allContainers)

  const previewArray = allContainers.map((obj, i) => 
    <ImagePreview 
      containerInfo = {obj}
      key={'container ' + i} />)

  return (
    <div className="Environments">
      <div className="EnvContainer">
        {previewArray}
      </div>
>>>>>>> 942a327a4dc8269e44aedfd1376d374f888cc23d
    </div>
  );
};

export default Environments;
