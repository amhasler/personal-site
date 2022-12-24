import './App.scss';
import React, { useState, useEffect } from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Home from '../home/Home'
import About from '../about/About'
import Case1 from '../case1/Case1'
import Case2 from '../case2/Case2'
import Case3 from '../case3/Case3'
import Shorts from '../shorts/Shorts'
import Hireme from '../hireme/Hireme'
import CV from '../cv/CV'
import Resume from '../resume/Resume'
import Portfolio from '../portfolio/Portfolio'
import CssBaseline from '@mui/material/CssBaseline';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [width, setWindowWidth] = useState(0)
  useEffect(() => {

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

  return (
    <>
    <CssBaseline />
    <Router>
      <div className="content">
      <Header showTopNavMenu={responsive.showTopNavMenu}/>
      <Routes>
        <Route exact path="/" element={<Home showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/about" element={<About showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/case1" element={<Case1 showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/case2" element={<Case2 showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/case3" element={<Case3 showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/shorts" element={<Shorts showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/hireme" element={<Hireme showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/cv" element={<CV showTopNavMenu={responsive.showTopNavMenu} />} />
        <Route path="/resume" element={<Resume showTopNavMenu={responsive.showTopNavMenu} />} />

      </Routes>
      </div>
      <Footer showTopNavMenu={responsive.showTopNavMenu}/>
    </Router>
    </>
  );
}

export default App;

// <Route path="/portfolio" element={<Portfolio showTopNavMenu={responsive.showTopNavMenu} />} />
