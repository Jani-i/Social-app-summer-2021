import React, { useState, useEffect } from 'react'
import { MyContext } from './ServerList';
import { database } from '../Firebase';
import { useAuth } from '../context/AuthContext';
import styles from './AddUsersToServer.module.css';


export default function AddUsersToServer() {

    const contextServerName = MyContext.Provider.value.serverName;

    const { currentUser } = useAuth();

    const userIntoString = currentUser.email;
    const userIntoUrl = userIntoString.replaceAll('.', '-');
    
    const [ writtenName, setWrittenName ] = useState('');
    const [ error, setError ] = useState('');
    const [friendEmail, setFriendEmail ] = useState('');

    
    
    //reference of the user to the server
    const databaseRefUserToServer = database.ref('servers/' + contextServerName + '/users');
    //add a new server and a user to server
    const newUserToServerRef = databaseRefUserToServer.push();

    //Reference to emails
    const friendEmailRef = database.ref('emails/' + writtenName);


    async function getFriendEmail() {
        
        

        let promise = new Promise(resolve => {
            friendEmailRef.on('value', (snapshot) => {
                const data = snapshot.val();
                
                setTimeout(() => {
                    resolve(data);
                }, resolve);
            });
        })
        
        let result = await promise;
        
        

        return(result);
    }

    const changeHandler = (e) => {
        e.preventDefault()

        
        let writtenUser = e.target.value;

        setWrittenName(writtenUser);
        setError('');
    }

    async function onSubmit () {
        const result = await getFriendEmail()

        //reference of the server to the user
        const databaseRefServerToUser = database.ref('users/' + result + '/servers');
        //add a new server to user
        const newServerToUserRef = databaseRefServerToUser.push();

        if(writtenName != '') {
            
            console.log(result)
            //add user to server
            newUserToServerRef.set(result);
            //add server to user
            newServerToUserRef.set(contextServerName);

            setError('');
            setWrittenName('');
        }
        else if( writtenName.includes('.') || writtenName.includes(',') || writtenName.includes('@')) {
            setError('Server name must not include . or , or @');
        }
        else {
            setError('Server name must contain at least 1 letter.');
        }

    }

    return (
        <div className={styles.container}>
            <input type="text" placeholder='Add user to server' onChange={changeHandler} value={writtenName} className={styles.textbox} />
            <button className={styles.button} onClick={onSubmit}>send</button>
        </div>
    )
}
