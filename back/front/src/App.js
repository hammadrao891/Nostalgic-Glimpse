import React, { useState } from 'react'
import Login from './pages/login/Login'
import Home from './pages/home/Home';
import Register from './pages/register/Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger2 from "./components/messenger2/Messenger2";
import Conversation from './components/conversations/Conversation';
import { pContext } from './context/PContext';
import Message from './components/message/Message';
import LandingPage from './pages/landingpage/LandingPage';
import Navbar from './components/navbar/Navbar';
import About from './pages/about/About';
const App = () => {
  const { user } = useContext(AuthContext);
  const [pId,setPId]=useState(null)
  return (
    // <Login/>
    <pContext.Provider value={{pId,setPId}}>
    <Router>
      <Switch>
        <Route exact path="/">
        {user ? <Home/> :<Login />}
        </Route>
        <Route path="/about">
        <About/>
          </Route>
        <Route path="/home">
        {!user ? <Login/> :<Home />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/home"/> :<Login />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/home" /> : <Register />}
        </Route>
        <Route path="/messenger">
        {!user ? <Redirect to="/login" /> : <Messenger2 />}
        </Route>
        <Route path="/messages">
        {!user ? <Redirect to="/login" /> : <Message />}
        </Route>
      </Switch>
    </Router>
    </pContext.Provider>
  )
}

export default App
