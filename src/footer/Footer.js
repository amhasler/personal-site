import React, { useState, useEffect } from 'react'
import '../app/App.scss';
import './Footer.scss'
import image from "../img/logo.png";

function Footer({ showTopNavMenu }) {
  //const showNav = {
  //  display: showTopNavMenu ? 'flex' : 'none'
  //}
  //const showContact = {
  //  display: showTopNavMenu ? 'flex' : 'none'
  //}
  //const showMenuIcon = {
  //  display: showTopNavMenu ? 'none' : 'flex',
  //}
  return (
     <footer>
       <div id="nav-icon" style={{ backgroundImage:`url(${image})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
         height:82,width:126  }}/>
     </footer>
  )
}

export default Footer;
