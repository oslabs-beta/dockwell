import React, { useEffect, useState } from 'react';
import ImagePreview from '../components/ImagePreview';
import axios from 'axios';

const Environments = (props) => {
  const [fastState, setFastState] = useState({});

  const getFastStats = () => {
    axios
      .get('/api/getFastStats')
      .then((data) => {
        setFastState(data.data);
      })
      .catch((err) => {
        console.error('Error fetching high-level container metrics: ', err);
      });
    return getFastStats;
  };

  useEffect(() => {
    setInterval(getFastStats(), 500);
  }, []);

  const previewArray = Object.values(fastState).map((obj, i) => (
    <ImagePreview obj={obj} key={'container ' + i} />
  ));

  return <div className="Environments">{previewArray}</div>;
};

export default Environments;
