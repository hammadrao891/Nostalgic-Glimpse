import { Link } from 'react-router-dom';
import React from 'react'
import { useContext, useRef } from "react";
import Navbar from "../../components/navbar/Navbar"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
    const email = useRef();
    const password = useRef();
    const { user,isFetching, dispatch } = useContext(AuthContext);
    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
          { email: email.current.value, password: password.current.value },
          dispatch
        );
        console.log(user)
      };
  return (
    <>
    {/* <div className='navbar'> */}
    <Navbar/>
    {/* </div> */}
<div className='container'>
{/* <img className='img1' src="https://images.pexels.com/photos/12161836/pexels-photo-12161836.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Snow" /> */}
    {/* <div className='logins'> */}
      {/* <div className="loginRight"> */}
          <form className="loginBox" onSubmit={handleClick}>
            <h2 className='loginHead'>Login</h2>
            <input
              placeholder="Email"
              // type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              // minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                "Loading" 
              ) : (
                "Log In"
              )}

            </button>
                {/* {user && <Link to="/form"></Link>  } */}
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
            <button className="loginRegisterButton">
              Create New Account
            </button>
            </Link>
          </form>
        </div>
        <footer className='footer'>
          <div className='foo'>
            Contact for any sort of queries 000-1111-111-00</div>
        </footer>
        {/* </div> */}
        {/* </div> */}
    </>
  )
}

export default Login
