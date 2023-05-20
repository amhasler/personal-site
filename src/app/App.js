import './App.scss';
import React, { useState, useEffect } from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Home from '../home/Home'
import Hireme from '../hireme/Hireme'
import About from '../about/About'
import Case1 from '../cases/case1/Case1'
import Case2 from '../cases/case2/Case2'
import Case3 from '../cases/case3/Case3'
import Shorts from '../cases/shorts/Shorts'
import Sustainability from '../sustainability/Sustainability'
import MentalHealth from '../mentalHealth/MentalHealth'
import Civic from '../civic/Civic'
import Badges from '../badges/Badges'
import Thirty from '../thirty/Thirty'
import Ethan from '../ethan/Ethan'
import Post from '../post/Post'
import CssBaseline from '@mui/material/CssBaseline';


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [width, setWindowWidth] = useState(0)
  const [scrollTop, setScrollTop] = useState(0);
  const handleScroll = (event) => {
    setScrollTop(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () =>
      window.removeEventListener("resize",updateDimensions);
    }, [])
    const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width)
  }

  const responsive = {
    showTopNavMenu: width > 1200
  }

  const background = {
    showBackground: scrollTop > 20
  }

  const path = window.location.pathname.replace(/\//g,'')

  return (
    <>
    <CssBaseline />
    <Router>
      <div className={`content ${path}`}>
      <Header showBackground={background.showBackground} showTopNavMenu={responsive.showTopNavMenu} />
      <Routes>
        <Route exact path="/" element={<Home showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/about" elemensst={<About showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/case1" element={<Case1 showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/case2" element={<Case2 showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/case3" element={<Case3 showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/shorts" element={<Shorts showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/hireme" element={<Hireme showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/sustainability" element={<Sustainability showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/mentalhealth" element={<MentalHealth showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/civic" element={<Civic showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/badges" element={<Badges showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/thirty" element={<Thirty showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/ethan" element={<Ethan showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/post/:slug" element={<Post showTopNavMenu={responsive.showTopNavMenu} />} />
      </Routes>
      </div>
      <Footer showTopNavMenu={responsive.showTopNavMenu}/>
    </Router>
    </>
  );
}

export default App;

// <Route path="/portfolio" element={<Portfolio showTopNavMenu={responsive.showTopNavMenu} />} />
