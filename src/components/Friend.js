import React from 'react'
import styles from './Friend.module.css'
import useProfilePicUrl from '../hooks/useProfilePicUrl'


export default function Friend() {

    const {picUrl} = useProfilePicUrl();

    
    return (
        <div className={styles.container}>
            <img src={picUrl} />
        </div>
    )
}
