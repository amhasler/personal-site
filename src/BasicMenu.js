import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom'

function BasicMenu({ trigger, items }) {
  const [anchorEl, setAnchorEl] = useState(0)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = items.map((item, index) => (
    <MenuItem onClick={handleClose} key={index}><NavLink style={{textDecoration:'none', color:'#2B353D'}} to={item.link}>{item.display}</NavLink></MenuItem>
  ));

  return (
    <>
      <li
        //id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        onClick={handleClick}
      >
        {trigger}
      </li>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems}
      </Menu>
    </>
  )

}

export default BasicMenu;
