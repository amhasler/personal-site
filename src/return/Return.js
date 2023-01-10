import '../app/App.scss';
import './Return.scss'
import { NavLink } from 'react-router-dom'
import left from "../img/oaks-left.png";
import right from "../img/oaks-right.png";

function Footer({ showTopNavMenu, gray }) {
  //const showNav = {
  //  display: showTopNavMenu ? 'flex' : 'none'
  //}
  //const showContact = {
  //  display: showTopNavMenu ? 'flex' : 'none'
  //}
  //const showMenuIcon = {
  //  display: showTopNavMenu ? 'none' : 'flex',
  //}

  const main = {
    backgroundColor: gray ? "#f5f5f5" : "#ffffff"
  }

  return (
     <div className="return" style={main}>
       <div style={{ backgroundImage:`url(${left})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
         height:44,width:357  }}/>
      <NavLink to="/"><h5>Return Home</h5></NavLink>
      <div style={{ backgroundImage:`url(${right})`, backgroundRepeat:"no-repeat",backgroundSize:"contain",
        height:44,width:357  }}/>
     </div>
  )
}

export default Footer;
