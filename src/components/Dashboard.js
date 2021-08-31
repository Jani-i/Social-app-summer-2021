import React, { useState } from 'react'
import { useAuth } from "../context/AuthContext"
import {  Link, useHistory } from "react-router-dom"
import ServerList from './ServerList'
import User from './User'
import styles from './Dashboard.module.css'
import Header from './Header'



export default function Dashboard() {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
        
      }

    return (
        <div className={styles.container}>
          <Header />
          <User/>
          <button className={styles.logoutbutton} onClick={handleLogout}>Log out</button>
          <Link className={styles.updatelink} to="/update-profile">Update profile</Link>
          <ServerList/>
        </div>
    )
}
