import React, { useEffect, useState } from 'react';
import ImagePreview from '../components/ImagePreview.jsx';
import axios from 'axios';

const Environments = (props) => {
  const [fastState, setFastState] = useState({});

  const getFastStats = () => {
    axios
      .get(`http://localhost:3535/api/getFastStats`)
      .then((data) => {
        setFastState(data.data);
      })
      .catch((err) => {
        console.error('error');
      });
    return getFastStats;
  };

  useEffect(() => {
    setInterval(getFastStats(), 500);
  }, []);

  // console.error('keys', Object.values(fastState));

  const previewArray = Object.values(fastState).map((obj, i) => (
    <ImagePreview obj={obj} key={'container ' + i} />
  ));

  return (
    <div className="Environments">
      <div className="EnvContainer">{previewArray}</div>
    </div>
  );
};

export default Environments;
