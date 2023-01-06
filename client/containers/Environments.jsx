import React from 'react';
import ImagePreview from '../components/ImagePreview.jsx';

// const ImagePreviewArray = [];

const Environments = () => {

  //need to map list of images to create image previews


  return (
    <div className="Environments">
      <div className="EnvContainer">
        <ImagePreview />
        <ImagePreview />
      </div>
    </div>
  );
};

export default Environments;
