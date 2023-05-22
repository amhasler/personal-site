import React, { useState, useEffect } from 'react'
import '../app/App.scss'
import './Sustainability.scss'
import image from "../img/background.png"
import globes from "../img/globes.png"
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import { NavLink } from 'react-router-dom'

import FormContainer from '../formContainer/FormContainer'

const query = `
{
  pillarPage(id: "5LB4BJPILPv5CY4OkJWsMm") {
    sys {
      id
    }
    text {
      json
    }
    header
		subheader
  }
	blogPostCollection(where: { topic: "sustainability"}) {
		items {
			title
			slug
		}
	}
}`

function Sustainability({ showTopNavMenu }) {
  const [page, setPage] = useState(null);
	const [collection, setCollection] = useState(null)

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/8sj1lftovdi0/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer FrqT2CJuMdseekDrrQVLamir4uDPKSn_e1uMXRWE8sA",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }
        // rerender the entire component with new data
       setPage(data.pillarPage);
			 setCollection(data.blogPostCollection)
			 //setCollection(data.blogPostCollection)s
      });
  }, []);



  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
	}

	const heroImage = {
		backgroundImage:`url(${globes})`,
		backgroundRepeat:"no-repeat",
		backgroundSize:"contain",
		backgroundPosition: "center",
		height:'100%',
		width: showTopNavMenu ? 650 : '100%',
		//marginTop: -50
	}

	const hero = {
		backgroundImage:`url(${image})`,
		backgroundRepeat:"repeat",
		backgroundSize:"contain",
		backgroundPosition:"center",
		height: showTopNavMenu ? 500 : 700,
		display: 'flex',
	  flexDirection: showTopNavMenu ? 'row' : 'column',
		//paddingTop: 50,
		borderBottom: '1px solid black',
    padding: '100px 20px 0px'
	}

	const heroContainer1 = {
		width: showTopNavMenu ? '49%' : '100%',
		height: showTopNavMenu ? '100%' : '300px'
	}

  const heroContainer2 = {
		width: showTopNavMenu ? '49%' : '100%',
		height: showTopNavMenu ? '100%' : '300px',
    paddingTop: showTopNavMenu ? '40px' : 0
	}

	const heroHeadline = {
	  verticalAlign: showTopNavMenu ? '40%' : 'middle',
    fontSize: showTopNavMenu ? '52px' : '36px',

	}

	const postMain = {
		maxWidth: showTopNavMenu ? '1010px' : '545px',
		margin: "0px auto",
		float: "none",
		padding: '50px 50px'
	}

	const postsHeader = {
		textAlign: 'left'
	}

  const subheader = {
    marginTop: showTopNavMenu ? '30px' : '0px'
  }

  return (
    <>
			<div className="hero" style={hero}>
				<div className="heroContainer" style={heroContainer1}>
					<div className="heroImage" style={heroImage} />
				</div>
				<div className="heroContainer" style={heroContainer2}>
					<h1 style={heroHeadline}>{page.header}</h1>
					<h2 style={subheader}>{page.subheader}</h2>
				</div>
			</div>
			<div className="postContent" style={postMain}>
				<FormContainer />
			  {documentToReactComponents(page.text.json)}
				<h1 style={postsHeader}>Posts in this pillar:</h1>
				{collection.items.map(function(object, i){
					 return <p key={i}><NavLink to={`../post/${object.slug}`}>{object.title}</NavLink></p>;
				 })}
			</div>


    </>
  )
}

export default Sustainability;
