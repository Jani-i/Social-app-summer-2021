import React from 'react'
import styles from './Message.module.css'
import Username from './Username.js'

import "firebase/database";

export default function Message() {

    let time = new Date().toLocaleString();


    return (
        <div className={styles.container}>
            <div className="message">Hello there</div>
            <div>
                <Username/>
                <div>{time}</div>
            </div>
        </div>
    )

    
}
