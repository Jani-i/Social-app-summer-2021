import React, { useContext, useState, useEffect } from "react"
import { auth } from "../Firebase"
import firebase from "firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  //const storageRef = firebase.storage().ref();
  //var profilePicRef = storageRef.child({currentUser} + '/' + file.name);

  function signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return firebase.auth().signOut()
  }

  function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user)
      setLoading(false)
    } else {
      setCurrentUser()
      setLoading(false)
    }
  });
/*
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])
*/
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
