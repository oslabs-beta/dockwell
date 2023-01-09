import React from 'react';
import ImagePreview from '../components/ImagePreview.jsx';

// const ImagePreviewArray = [];

const Environments = ({ userPreviews }) => {
  //need to map list of images to create image previews

  // const previewArray = userPreviews.map((userPreview, i) => <ImagePreview previewInfo={userPreview} key={'userPreview' + 1} />)

  return (
    <div className="Environments">
      <div className="EnvContainer">
        {/* {previewArray} */}
        <ImagePreview />
        <ImagePreview />
      </div>
    </div>
  );
};

export default Environments;
