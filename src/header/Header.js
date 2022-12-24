import * as React from 'react';
import '../app/App.scss';
import './Header.scss'
import BasicMenu from '../BasicMenu'
import { NavLink } from 'react-router-dom'
import Drawer from '@mui/material/Drawer';
import image from "../img/logo.png";
import mail from "../img/envelope.png"
import instagram from "../img/instagram.png"
import twitter from "../img/twitter.png"
import linkedin from "../img/linkedin.png"
import hamburger from "../img/hamburger.png"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Header({ showTopNavMenu }) {
  const [open, setOpen] = React.useState(false);

  const showNav = {
    display: showTopNavMenu ? 'flex' : 'none'
  }
  const showContact = {
    display: showTopNavMenu ? 'flex' : 'none'
  }

  const alignLogo = {
    position: showTopNavMenu ? 'absolute' : 'inherit',
    left: showTopNavMenu ? '50%' : 'auto',
    top: showTopNavMenu ? '2%' : 'auto',
    transform: showTopNavMenu ? 'translateX(-50%)' : 'none',
    backgroundImage:`url(${image})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    height:82,
    width:126
  }

  const alignHamburger = {
    backgroundImage:`url(${hamburger})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    height:82,
    width:126,
    display: showTopNavMenu ? 'none' : open ? 'none' : 'block',
    cursor: 'pointer',
    flex: '0 1 auto',
    marginLeft: 'auto'
  }

  const menuList = {
    paddingLeft:'0px',
    fontSize:'1.25em',
    textTransform:'uppercase',
    borderBottom: '1px solid #585858',
    paddingTop:'10px',
    paddingBottom:'10px'
  }

  const drawerWidth = 360;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
     <header className="site-header">
       <nav id="main-nav" style={showNav}>
         <li><NavLink to="/about">story</NavLink></li>
         <BasicMenu trigger={"works"} items={[{display: 'Case 1', link: '/case1'}, {display: 'Case 2', link: '/case2'}, {display: 'Case 3', link: '/case3'}, {display: 'Short Stories', link: '/shorts'}]}/>
         <li><NavLink to="/hireme">hire me</NavLink></li>
         <BasicMenu trigger={"documents"} items={[{display: 'Curriculum Vitae', link: '/cv'}, {display: 'Résumé', link: '/resume'}, {display: 'Portfolio', link: '/portfolio'}]}/>
       </nav>
       <div id="nav-icon" style={alignLogo} />
       <div id="contact-container" style={showContact}>
        <ul>
         <li><div id="mail" style={{ backgroundImage:`url(${mail})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
            height:42,width:42  }}/></li>
         <li><div id="twitter" style={{ backgroundImage:`url(${twitter})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
            height:55,width:55  }}/></li>
         <li><div id="instagram" style={{ backgroundImage:`url(${instagram})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
            height:45,width:45  }}/></li>
         <li><div id="linkedin" style={{ backgroundImage:`url(${linkedin})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
            height:45,width:45  }}/></li>
            </ul>
       </div>
       <div id="hamburger-icon" style={alignHamburger} onClick={handleDrawerOpen} />
       <Drawer
          sx={{
            width: open ? drawerWidth : 0,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : 0,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <div style={{paddingLeft:'10px', paddingTop:'5px'}}>
            <IconButton onClick={handleDrawerClose} style={{width:'45px'}}>
              <ChevronRightIcon />
            </IconButton>
            <span onClick={handleDrawerClose} style={{fontSize: '1em', fontFamily: 'Cabin', marginLeft:'5px', cursor: 'pointer'}}>CLOSE</span>
          </div>
          <hr style={{width:'100%', marginBottom:'-10px'}}/>
          <div className="drawerContainer">
            <ul style={{paddingLeft:'10px'}}>
              <li style={menuList}><NavLink to="/about">story</NavLink></li>
              <li>
                <Accordion style={{boxShadow:'none', fontSize:'1.25em', textTransform:'uppercase', borderBottom: '1px solid #585858'}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{paddingLeft:'0px'}}
                  >
                    works
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      <li style={{marginBottom:'10px'}}><NavLink to="/case1">case1</NavLink></li>
                      <li style={{marginBottom:'10px'}}><NavLink to="/case2">case2</NavLink></li>
                      <li style={{marginBottom:'10px'}}><NavLink to="/case3">case3</NavLink></li>
                      <li><NavLink to="/shorts">selected shorts</NavLink></li>
                    </ul>
                  </AccordionDetails>
                  </Accordion>
              </li>
              <li style={menuList}><NavLink to="/hireme">hire me</NavLink></li>
              <li>
                <Accordion style={{boxShadow:'none', fontSize:'1.25em', textTransform:'uppercase', borderBottom: '1px solid #585858'}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{paddingLeft:'0px'}}
                  >
                    documents
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul style={{paddingLeft:'10px'}}>
                      <li style={{marginBottom:'10px'}}><NavLink to="/cv">curriculum vitae</NavLink></li>
                      <li style={{marginBottom:'10px'}}><NavLink to="/resume">Résumé</NavLink></li>
                      <li style={{marginBottom:'10px'}}><NavLink to="/portfolio">portfolio</NavLink></li>
                    </ul>
                  </AccordionDetails>
                  </Accordion>
              </li>
            </ul>
          </div>
          <div id="drawer-contact-container">
           <ul>
            <li><div id="mail" style={{ backgroundImage:`url(${mail})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
               height:42,width:42  }}/></li>
            <li><div id="twitter" style={{ backgroundImage:`url(${twitter})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
               height:55,width:55  }}/></li>
            <li><div id="instagram" style={{ backgroundImage:`url(${instagram})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
               height:45,width:45  }}/></li>
            <li><div id="linkedin" style={{ backgroundImage:`url(${linkedin})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
               height:45,width:45  }}/></li>
               </ul>
          </div>
        </Drawer>
     </header>
  )
}

export default Header;

//<nav id="navigation">{navMenuItems}</nav>//
