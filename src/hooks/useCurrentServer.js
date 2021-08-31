import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { database } from '../Firebase';
import useFireStorage from '../hooks/useFireStorage';

const useCurrentServer = () => {

    const [ userServers, setUserServers ] = useState([]);
    const [ serverKeys, setServerKeys ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const { currentUser } = useAuth();

    const userIntoString = currentUser.email;
    const userIntoUrl = userIntoString.replaceAll('.', '-');

    //const userServersRef = database.ref('users/' + userIntoUrl + '/servers').orderByKey();

    useEffect( () => {

        const userServersRef = database.ref('users/' + userIntoUrl + '/servers').orderByKey();

        userServersRef.on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var childvalue = childSnapshot.val();
                var childkey = childSnapshot.key;
                userServers.push(childvalue);
                serverKeys.push(childkey);
                console.log(userServers)
                
            })
            setLoading(true);
        });

        setLoading(false)
          
        
        
    }, [])

    return { userServers, serverKeys}
}

export default useCurrentServer;