import React from 'react'
import useUserName from '../hooks/useUserName'
import styles from './Username.module.css'


export default function Username() {

    const { gotUserName } = useUserName();

    return (
        <div className={styles.username}>
            { gotUserName }
        </div>
    )
}
