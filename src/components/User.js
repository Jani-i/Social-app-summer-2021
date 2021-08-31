import React from 'react'
import styles from './User.module.css'
import Username from './Username.js'
import useProfilePicUrl from '../hooks/useProfilePicUrl'


export default function User() {

    const {picUrl} = useProfilePicUrl();

    
    return (
        <div className={styles.container}>
            <div className={styles.piccontainer}>
                <img src={picUrl} />
            </div>
            <div className={styles.namecontainer}>
                <Username/>
            </div>
        </div>
    )
}

