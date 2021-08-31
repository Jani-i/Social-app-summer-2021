import React, { useState, useRef } from "react";
//import firebase from 'firebase';
import "firebase/database";
import { useAuth } from "../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import { database } from "../Firebase";
import styles from './Register.module.css';


export default function Register() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [ userName, setUserName ] = useState('');
  const [ email, setEmail ] = useState('');

  const userIntoString = email;
  const userIntoUrl = userIntoString.replaceAll('.', '-');

  const databaseRef = database.ref('users/' + userIntoUrl + '/username' );
  const databaseRef2 = database.ref('emails/' + userName);


  const changeHandler = (e) => {
    e.preventDefault()
    
    let writtenName = e.target.value;

    if(writtenName.includes('.') || writtenName.includes(',')) {
        setUserName('');
        setError('Do not use . or ,');
    } else {
        setUserName(writtenName);
        setError('');
    }
  }

  const changeHandler2 = (e) => {
    e.preventDefault()
    
    let writtenEmail = e.target.value;

        setEmail(writtenEmail);
        setError('');
  }


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
      await databaseRef.set(userName);
      await databaseRef2.set(userIntoUrl)
      history.push("/")
    } catch {
      setError("Failed to sign up")
    }

    setLoading(false)
  }


    return (
        <div className={styles.container}>
          <input type="text" placeholder='Email' className={styles.email} onChange={changeHandler2} ref={emailRef} />
          <input type="password" placeholder='Password' className={styles.password} ref={passwordRef}/>
          <input type="password" placeholder='Confirm password' className={styles.passwordconfirm} ref={passwordConfirmRef}/>
          <input type="text" placeholder='Username' className={styles.username} onChange={changeHandler} name="name" />
          <button onClick={handleSubmit} className={styles.button}>Sign up</button>
          <Link to="/login" className={styles.loginlink}>Already have an account? Click here.</Link>
          <div>{error}</div>
        </div>
    )
}
