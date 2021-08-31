import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";


const app = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  })

  
  export const projectStorage = firebase.storage();
  export const database = firebase.database();
  export const auth = app.auth
  export default app
