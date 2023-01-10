import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import './CaseModule.scss'
import { NavLink } from 'react-router-dom'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'


function Breakdown({ responsive, text, title, image, left }) {

  const leftCircle = {
    backgroundColor: '#B28859',
    left: '0%',
    top: '0%'
  }

  const centerCircle = {
    backgroundColor: '#8D1D28',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    top: '0%'
  }

  const rightCircle = {
    backgroundColor: '#2B353D',
    right: '0%',
    top: '0%'
  }

  const leftImage = {
    backgroundImage:`url(${image.url})`,
    position: 'absolute',
    left: '5%',
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    width: '550px',
    height: '550px',
    marginTop: '25px'
  }

  const rightImage = {
    backgroundImage:`url(${image.url})`,
    position: 'absolute',
    right: '5%',
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    width: '550px',
    height: '550px',
    marginTop: '25px'
  }

  const rightText = {
    right: '0%'
  }

  const leftText = {
    left: '0%'
  }

  const container = {
    width: '1080px'
  }

  return (
    <div className='caseModule'>
      <div className="moduleContainer" style={container}>
        <div className="circle" style={left === "left" ? leftCircle : left === "center" ? centerCircle : rightCircle } />
        <div className="moduleImage" style={left === "left" ? rightImage : leftImage } />
        <div className="moduleText" style={left === "left" ? leftText : rightText } >
          <h5>{title}</h5>
          {documentToReactComponents(text.json)}
        </div>
      </div>
    </div>
  )
}

export default Breakdown;

//
