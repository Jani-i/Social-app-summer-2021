import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { database } from '../Firebase';
import styles from './CreateServer.module.css';

export default function CreateServer() {

    const { currentUser } = useAuth();
    
    const [ serverName, setServerName ] = useState('');
    const [ error, setError ] = useState('');

    const userIntoString = currentUser.email;
    const userIntoUrl = userIntoString.replaceAll('.', '-');


    //reference of the server to the user
    const databaseRefServerToUser = database.ref('users/' + userIntoUrl + '/servers');
    //reference of the user to the server
    const databaseRefUserToServer = database.ref('servers/' + serverName + '/users');

    //add a new server and a user to server
    const newUserToServerRef = databaseRefUserToServer.push();
    //add a new server to user
    const newServerToUserRef = databaseRefServerToUser.push();
    

    const changeHandler = (e) => {
        e.preventDefault()

        
        let writtenName = e.target.value;

        if(writtenName.includes('.') || writtenName.includes(',') || writtenName.includes('@')) {
            setServerName('');
            setError('Do not use . or , or @');
        } else {
            setServerName(writtenName);
            setError('');
        }
    }


    function onSubmit () {
        
        if(serverName != '') {
            //add server creator
            newUserToServerRef.set(userIntoUrl);
            //add server to user
            newServerToUserRef.set(serverName);
            
            setError('');
        }
        else if( serverName.includes('.') || serverName.includes(',') || serverName.includes('@')) {
            setError('Server name must not include . or , or @');
        }
        else {
            setError('Server name must contain at least 1 letter.');
        }
    }


    return (
        <div className={styles.container}>
            <form className={styles.things}>
                
                <label>
                    <div className={styles.text}>
                    Server name
                    </div>
                    <div className={styles.textboxcontainer}>
                        <input className={styles.textbox} type="text" onChange={changeHandler} name="name" />
                    </div>
                </label>
            
                <div className={styles.button}>
                    <input type="submit" value="Submit" onClick={onSubmit} />
                </div>
            </form>
        </div>
    )
}
