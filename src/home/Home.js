import React, { useState, useEffect } from 'react'
import '../app/App.scss';
import Hero from './hero/Hero'
import Trailer from './trailer/Trailer'

function Home({ showTopNavMenu }) {
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
    <>
     <Hero responsive={showTopNavMenu}/>
     <Trailer responsive={showTopNavMenu}/>
     </>
  )
}

export default Home;
