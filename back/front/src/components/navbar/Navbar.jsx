import React from 'react'
import { Link } from 'react-router-dom'

import "./navbar.css"
const Navbar = () => {

// function myFunction() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += " responsive";
//   } else {
//     x.className = "topnav";
//   }
// }

  return (
    // <div>
      <div class="topnav" id="myTopnav">
  <Link to ="/login">Login</Link>
  <Link to ="/register">Register</Link>
  <Link to ="/about">About</Link>
  {/* <Link to ="javascript:void(0);" class="icon" onclick={myFunction()}>
    <i class="fa fa-bars"></i>
  </Link> */}
{/* </div> */}

    </div>
  )
}

export const NavbarH=()=>{

  return (
    // <div>
      <div class="topnav" id="myTopnav">
  <Link to ="/about">About</Link>
  <Link to ="/messenger">Messenger</Link>

    </div>
  )
}

export const NavbarM=()=>{
  return (
    // <div>
      <div class="topnav" id="myTopnav">
  <Link to ="/home">Home</Link>

    </div>
  )
}

export default Navbar
