import React, { useState, useRef, Alert } from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import styles from './Login.module.css';

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/")
      } catch {
        setError("Failed to log in")
      }
  
      setLoading(false)
    }

    return (
        <div className={styles.container}>
          <input type="text" placeholder='Email' className={styles.email} ref={emailRef} />
          <input type="password" placeholder='Password' className={styles.password} ref={passwordRef} />
          <button className={styles.button} onClick={handleSubmit}>Login</button>
          <Link to="/signup" className={styles.registerlink}>Don't have an account? Click here.</Link>
          <div>{error}</div>
        </div>
    )
}
