import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './ServerList.module.css';

import { useAuth } from '../context/AuthContext'
import { database } from '../Firebase';
import useCurrentServer from '../hooks/useCurrentServer';

export const MyContext = React.createContext();

export default function ServerList() {


    const { userServers } = useCurrentServer();
    const { serverKeys } = useCurrentServer();
    const { currentUser } = useAuth();

    const [ chosenServer, setChosenServer ] = useState('');
    
    const userIntoString = currentUser.email;
    const userIntoUrl = userIntoString.replaceAll('.', '-');


    function clickHandler (e)  {
        let serverName = e.target.text;
        //setChosenServer(serverName)
        MyContext.Provider.value={serverName}
    }


    return (
        <div className={styles.container}>
          {userServers.map((server) => (
            <div className={styles.namecontainer}>
                <Link className={styles.servername} to="/chat" onClick={clickHandler}>{server}</Link>
            </div>
            ))}
            <div className={styles.createlinkcontainer}>
                <Link className={styles.createserverlink} to="/create-server">Add a server</Link>
            </div>
            
        </div>
    );
}
