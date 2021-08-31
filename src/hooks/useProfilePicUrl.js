import { useState, useEffect } from 'react';
import { projectStorage } from '../Firebase';
import { useAuth } from '../context/AuthContext';
import { database } from '../Firebase';

const useProfilePicUrl = () => {

    
    const { currentUser } = useAuth();


    const [ picUrl, setPicUrl] = useState('');

    const userIntoString = currentUser.email;
    const userIntoUrl = userIntoString.replaceAll('.', '-');


    useEffect(() => {
          
        const databaseRef = database.ref('users/' + userIntoUrl + '/profilePicUrl');

        databaseRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setPicUrl(data)
          });
        
    }, [ currentUser.email])
        

    return { picUrl };
}

export default useProfilePicUrl;