import React, { useEffect, useState } from 'react';
import ImagePreview from '../components/ImagePreview';
import axios from 'axios';

const Environments = (props: any) => {
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
    setInterval(getFastStats(), 10000);
  }, []);

  const previewArray = Object.values(fastState).map((obj, i) => (
    <ImagePreview
      getFastStats={getFastStats}
      obj={obj}
      key={'container ' + i}
    />
  ));

  return <div className="Environments">{previewArray}</div>;
};

export default Environments;
