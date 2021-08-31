import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { database } from '../Firebase';
import useFireStorage from '../hooks/useFireStorage';

const useUserName = () => {

    const [ gotUserName, setGotUserName ] = useState('');

    const { currentUser } = useAuth();

    const userIntoString = currentUser.email;
    const userIntoUrl = userIntoString.replaceAll('.', '-');


    useEffect(() => {
        
        const databaseRef = database.ref('users/' + userIntoUrl + '/username');

        databaseRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const dataIntoString = data.toString()
            setGotUserName(dataIntoString)
          });
        
    }, [gotUserName])

    return { gotUserName };
}

export default useUserName;