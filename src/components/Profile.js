import React from 'react'
import styles from './Friend.module.css'
import Username from './Username.js'
import useProfilePicUrl from '../hooks/useProfilePicUrl'


export default function Profile() {

    const picUrl = useProfilePicUrl();

    return (
        <div className={styles.container}>
            <img src={picUrl} />
            <Username/>
        </div>
    )
}
