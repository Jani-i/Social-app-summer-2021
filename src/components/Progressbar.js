import React, { useEffect } from 'react';
import useFireStorage from '../hooks/useFireStorage';

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useFireStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <div className="progress-bar"
     
    ></div>
  );
} 

export default ProgressBar;