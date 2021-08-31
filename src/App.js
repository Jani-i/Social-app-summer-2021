import React from 'react';
import './App.module.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import UpdateProfile from './components/UpdateProfile';
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Server from './components/Server';
import CreateServer from './components/CreateServer';



//import firebase from "./Firebase.js";


function App() {
  return (
      <div>
        <Router>
          <AuthProvider>
            <PrivateRoute path="/" component={Dashboard} />
            <Switch>
              <PrivateRoute path="/create-server" component={CreateServer} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/chat" component={Server} />
              <Route path="/signup" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
  )
}

export default App;
