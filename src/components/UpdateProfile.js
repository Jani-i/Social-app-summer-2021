import React, { useState, useRef } from "react";
//import firebase from 'firebase';
import "firebase/database";
import { useAuth } from "../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import UploadFile from "./UploadFile";
import DeleteFile from "./DeleteFile";
import UpdateUserName from "./UpdateUserName";
import styles from './UpdateProfile.module.css';

export default function UpdateProfile() {

  
  //const [error, setError] = useState("")
  //const [loading, setLoading] = useState(false)
  //const history = useHistory()


/*
  async function handleSubmit(e) {
    e.preventDefault()

    //password confirmation
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to save the changes.")
    }

    setLoading(false)
  }
*/

    return (
        <div className={styles.container}>
          <div className={styles.changeavatarcontainer}>
            <div className={styles.changetext}>Change avatar</div>
            <UploadFile />
          </div>
          <div className={styles.usernamecontainer}>
            <div className={styles.usernametext}>Change username</div>
            <UpdateUserName />
          </div>
          <Link to="/" className={styles.cancellink}>{'\u2716'}</Link>
        </div>
    )
}
