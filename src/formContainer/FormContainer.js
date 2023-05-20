import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom'
import HubspotForm from 'react-hubspot-form'
import './FormContainer.scss'

function FormContainer({ showTopNavMenu }) {


  	const formTitle = {
  		textAlign: 'center'
  	}

  return (
    <div className="formContainer">
       <h2 style={formTitle}>Let's keep talking</h2>
       <HubspotForm
          portalId='23840634'
          formId='1b744474-fd9a-44bd-86cf-95f70cc1769e'
          onSubmit={() => console.log('Submit!')}
          onReady={(form) => console.log('Form ready!')}
          loading={<div>Loading...</div>}
          />
     </div>
  )

}

export default FormContainer;
