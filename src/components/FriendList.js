import React from 'react'
import Friend from './Friend.js'
import styles from './FriendList.module.css'

export default function FriendList() {
    return (
        <div className={styles.container}>
            <Friend/>
        </div>
    )
}
