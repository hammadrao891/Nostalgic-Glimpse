import Navbar from "../../components/navbar/Navbar"
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useRef,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from "axios"
import './register.css'
import { data,DataCountry } from '../../states'
const Register = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
    const username=useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const countryRef=useRef();
    const cityRef=useRef();
    const email=useRef();
    const [countryid,setCountryid]=useState('')
    const [country,setCountry]=useState([])
    const [cityPresent, setCityPresent]= useState([]);
    const [state,setState]=useState([]);


    useEffect( ()=>{
      const getcountry=  ()=>{
        const req=  DataCountry;
        console.log(req);
        setCountry(req);
       
      }
     
      getcountry();
   
   
     },[]);
    // const history=useHistory();
    useEffect( ()=>{

      const getstate= async ()=>{
        
        const res=  data
        setCityPresent(res);
      }
        
      
      getstate();
    
    },[countryid]);
    const handlecountry=(event)=>{
      const getcoutryid= event.target.value;
      setCountryid(getcoutryid);
      // console.log(getcoutryid)
      event.preventDefault();
    
    }
      const handleClick=async(e)=>{
        e.preventDefault();
        if(password.current.value !== passwordAgain.current.value)
        {
            passwordAgain.current.setCustomValidity("Passwords do not match")
        }
        else
        {
          let con;
          if(countryid=="1")
          {
             con="Pakistan"
          }
          else{
            con="India"
          }
          const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
                cityPresent:cityRef.current.value,
                country:con
            };
            // console.log(user)
            // alert(con);
            // console.log(state)
            try{
                await 
                axios({
                    method: 'post',
                    baseURL,
                    url: 'auth/register',
                    data: user
                  });
                // alert('submitted');
                // axios.post("auth/register",user);
                // console.log("Submitted");
                window.location.reload();
            }
            catch(err)
            {
                console.log(err)
            }
        }
    }  
handleClick();

 
  return (
    <>
  <Navbar/>
    <div className='login'>
      <div className="loginRight">
       
          <form className="loginBoxR" onSubmit={handleClick}>
          <h3 className="regHead">Register</h3>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
             <label for="country" className="label">Country:</label>
            <select  name="country" className="loginInput" id="country" onChange={(e)=>handlecountry(e)}>
              <option>--Select Country--</option>
              {
                country.map((getcon)=>(
                  <option ref ={countryRef} key={getcon.country_name} value={getcon.id}>{getcon.country_name}</option>
                )
                  
                )
              }
              </select>
              <label for="cityPresent" className="label">Present City:</label>
              <select ref={cityRef} className="loginInput" name="cityPresent" id="cityPresent" >
                <option>--Select City--</option>
              {
                countryid==="2" ?
                cityPresent.filter(city=>city.country_id < 150).map((getcity)=>( 
                  <option value={getcity.state_name} key={getcity.state_id}>{getcity.state_name}</option>
                ))
                :
                cityPresent.filter(city=>city.country_id > 150 ).map((getcity)=>( 
                  <option value={getcity.state_name} key={getcity.state_id}>{getcity.state_name}</option>
                ))
              }
              </select>
 
            <button className="loginButton" type="submit">
              Register
            </button>
            <Link to ="/login">
            <button className="loginRegisterButton">Login</button>
            </Link>
          </form>
        
        </div>
        <div className='web'>
        <h1>Old Times</h1>
        <h3>time to get some nostalgia</h3>
        </div>
        </div>


    </>
  )
}

export default Register
