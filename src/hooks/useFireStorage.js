import { useState, useEffect } from 'react';
import { projectStorage, database } from '../Firebase';
import { useAuth } from '../context/AuthContext';

const useFireStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth()

  var userIntoString = currentUser.email;
  var userIntoUrl = userIntoString.replaceAll('.', '-');


  useEffect(() => {

    // references
    const storageRef = projectStorage.ref('images/');
    const databaseRef = database.ref('users/' + userIntoUrl + '/profilePicUrl')


    
    

    storageRef.child(userIntoString + '/profilePic').put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.child(userIntoString + '/profilePic').getDownloadURL();
      setUrl(url);
      databaseRef.set(url);
      
    });
  }, [file]);

  return { progress, url, error, };
}

export default useFireStorage;