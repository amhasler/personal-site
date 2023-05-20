import React, { useState, useEffect } from 'react'
import '../app/App.scss'
import './MentalHealth.scss'
import image from "../img/mind-body.png"
// import badges from "../img/badges.png"
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import { NavLink } from 'react-router-dom'

import FormContainer from '../formContainer/FormContainer'

const query = `
{
  pillarPage(id: "6f1xek7J0UOxQbtU6TIeCD") {
    sys {
      id
    }
    text {
      json
    }
    header
		subheader
  }
	blogPostCollection(where: { topic: "mental"}) {
		items {
			title
			slug
		}
	}
}`

function MentalHealth({ showTopNavMenu }) {
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
        // rerender the entire components with new data
       setPage(data.pillarPage);
			 setCollection(data.blogPostCollection)
			 //setCollection(data.blogPostCollection)s
      });
  }, []);



  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
	}

/*
	const heroImage = {s
		backgroundImage:`url(${badges})`,
		backgroundRepeat:"no-repeat",
		backgroundSize:"contain",
		backgroundPosition: "center",
		height:'100%',
		width: showTopNavMenu ? 650 : '100%',
		//marginTop: -50
	}
	*/

	const hero = {
		backgroundImage:`url(${image})`,
		backgroundRepeat:"no-repeat",
		backgroundSize:"contain",
		backgroundPosition:"center",
		height: showTopNavMenu ? 400 : 600,
		//display: 'flex',
	  //flexDirection: 'column',
		//paddingTop: 50,
		borderBottom: '1px solid black',
		paddingTop: 70
		//backgroundColor: "#f3f3f3"
	}

/*
	const heroContainer = {
		width: showTopNavMenu ? '49%' : '100%',
		height: showTopNavMenu ? '100%' : '300px'
	}
	*/

	const heroHeadline = {
		//marginTop:150,
	  //verticalAlign: showTopNavMenu ? '40%' : 'middle'
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
    <div>
			<div className="mentalHealthHero" style={hero}>
				<h1 style={heroHeadline}>{page.header}</h1>
				<h2>{page.subheader}</h2>
			</div>
			<div className="postContent" style={postMain}>
				<FormContainer />
			  {documentToReactComponents(page.text.json)}
				<h1 style={postsHeader}>Posts in this pillar:</h1>
				{collection.items.map(function(object, i){
					 return <p><NavLink key={i} to={object.slug}>{object.title}</NavLink></p>;
				 })}
			</div>


    </div>
  )
}

export default MentalHealth;

/*
<div className="heroImage" style={heroImage} />
*/
