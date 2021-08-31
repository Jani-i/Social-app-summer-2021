import React, { useEffect, useState, useRef } from 'react'
import { MyContext } from './ServerList'
import { database } from '../Firebase';
import { useAuth } from '../context/AuthContext';
import useUserName from '../hooks/useUserName';
import styles from './Server.module.css'
import AddUsersToServer from './AddUsersToServer';

export default function Server() {

    //Server consts
    const contextServerName = MyContext.Provider.value.serverName;

    const [ messageArray, setMessageArray ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ sendingMessage, setSendingMessage ] = useState(false);

    //WriteMessage consts
    const { currentUser } = useAuth();
    const { gotUserName } = useUserName();
    
    const [ messageText, setMessageText ] = useState('');
    const [ error, setError ] = useState('');

    const userIntoString = currentUser.email;
    const userIntoUrl = userIntoString.replaceAll('.', '-');

    //reference for messages on the server
    const databaseRef = database.ref('messages/' + contextServerName );

    //A new message to the server
    const newMessageRef  = databaseRef.push();

    //Write the message
    const changeHandler = (e) => {
        e.preventDefault()

        
        let writtenMessage = e.target.value;

        setMessageText(writtenMessage);
        setError('');
    }

    //Timestamp for the message
    function getTimestamp() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(new Date().toLocaleString());
          }, resolve);
        });
    }

    //Message, sender and timestamp into object
    async function sendMessage() {
        const time = await getTimestamp();
        return new Promise(resolve => {
            setTimeout(() => {
            resolve(    
                new Object({
                "sender" : gotUserName,
                "messagetext" : messageText,
                "time" : time
            }));
            }, resolve);
        });
    }

    //Onclick function for sending the message
    async function onSubmit () {

        if(messageText != '') {

            const send = await sendMessage();
            newMessageRef.set(send);
            setSendingMessage(true);
            setMessageText('');
            setError('');
        }
        else {
            setError('Can not send an empty message.');
        }

    }

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
      };
      

    
    useEffect( async () => {
        
        messageArray.splice(0, messageArray.length);

        const context = await contextServerName

        const databaseRef = database.ref('messages/' + context);

        databaseRef.on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var childtext = childSnapshot.val();
                messageArray.push(childtext)
            })
            setIsLoading(true);
        });
    
        
        setIsLoading(false);
        setSendingMessage(false);
        
        
    }, [sendingMessage, contextServerName])


    return (
        <div className={styles.container}>
            <div className={styles.servernamebuttoncontainer}>
                <MyContext.Consumer>
                {value => 
                <div className={styles.servernamecontainer}>
                    {MyContext.Provider.value.serverName}
                </div>
                }
                </MyContext.Consumer>
                <div>
                    <AddUsersToServer />
                </div>
            </div>
            
            <div className={styles.arraycontainer}>
                {messageArray.map((message) => (
                    <div className={styles.message}>
                        <div className={styles.sendertimecontainer}>
                            <div className={styles.sender}>
                                {message.sender}
                            </div>
                            <div className={styles.time}>
                                {message.time}
                            </div>
                        </div>
                        <div className={styles.messagetext}>
                            {message.messagetext}
                        </div>  
                    </div>
                ))}
                <AlwaysScrollToBottom />
            </div>
            <div className={styles.textboxbuttoncontainer}>
                <input className={styles.textbox} type="text" placeholder='Message' onChange={changeHandler} value={messageText} name="name" />
                <button className={styles.sendbutton} onClick={onSubmit}>send</button>
            </div>
        
        </div>
    )
}
