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
				console.log(data)
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
		backgroundRepeat:"repeat-x",
		backgroundSize:"contain",
		backgroundPosition:"center",
		height: showTopNavMenu ? 400 : 600,
		display: 'flex',
	  flexDirection: showTopNavMenu ? 'row' : 'column',
		//paddingTop: 50,
		borderBottom: '1px solid black'
	}

	const heroContainer = {
		width: showTopNavMenu ? '49%' : '100%',
		height: showTopNavMenu ? '100%' : '300px'
	}

	const heroHeadline = {
	  verticalAlign: showTopNavMenu ? '40%' : 'middle'
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

  return (
    <>
			<div className="hero" style={hero}>
				<div className="heroContainer" style={heroContainer}>
					<div className="heroImage" style={heroImage} />
				</div>
				<div className="heroContainer" style={heroContainer}>
					<h1 style={heroHeadline}>{page.header}</h1>
					<h2>{page.subheader}</h2>
				</div>
			</div>
			<div className="postContent" style={postMain}>
				<FormContainer />
			  {documentToReactComponents(page.text.json)}
				<h1 style={postsHeader}>Posts in this pillar:</h1>
				{collection.items.map(function(object, i){
					 return <p><NavLink key={i} to={object.slug}>{object.title}</NavLink></p>;
				 })}
			</div>


    </>
  )
}

export default Sustainability;
