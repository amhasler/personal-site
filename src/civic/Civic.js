import React, { useState, useEffect } from 'react'
import '../app/App.scss'
import './Civic.scss'
import image from "../img/congress.png"
import hands from "../img/hands.png"
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import { NavLink } from 'react-router-dom'

import FormContainer from '../formContainer/FormContainer'

const query = `
{
  pillarPage(id: "Xt59OngCA9TpX5bWOYaTu") {
    sys {
      id
    }
    text {
      json
    }
    header
  }
	blogPostCollection(where: { topic: "civic"}) {
		items {
			title
			slug
		}
	}
}`

function Civic({ showTopNavMenu }) {
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
		backgroundImage:`url(${hands})`,
		backgroundRepeat:"no-repeat",
		backgroundSize:"contain",
		backgroundPosition: "center bottom",
		height:'100%',
		width: showTopNavMenu ? 650 : '100%',
		//marginTop: -50
	}

	const hero = {
		backgroundImage:`url(${image})`,
		backgroundRepeat:"no-repeat",
		backgroundSize:"contain",
		backgroundPosition:"center",
		height: showTopNavMenu ? 400 : 600,
		display: 'flex',
	  flexDirection: showTopNavMenu ? 'row' : 'column',
		paddingTop: 50,
		borderBottom: '1px solid black'
	}

	const heroContainer = {
		width: showTopNavMenu ? '49%' : '100%',
		height: showTopNavMenu ? '100%' : '300px'
	}

	const heroHeadline = {
	  verticalAlign: showTopNavMenu ? '20%' : 'middle',
		fontFamily: '"Rampart One", cursive',
		fontSize: 72,
		display:'table-cell',
		textAlign: 'center'
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
					<h1 style={heroHeadline}>{page.header}</h1>
				</div>
				<div className="heroContainer" style={heroContainer}>
					<div className="heroImage" style={heroImage} />
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

export default Civic;

/*

 */

//<Breakdown oneNumber={page.breakdown1Number} oneText={page.breakdown1Text} twoNumber={page.breakdown2Number} twoText={page.breakdown2Text}  threeNumber={page.breakdown3Number} threeText={page.breakdown3Text} />
//<CaseModule left={true} text={page.module1Text} label={page.module1Label} image={page.module1Image.url} />
//<CaseModule left={false} text={page.module2Text} label={page.module2Label} image={page.module2Image.url}  />
//<CaseModule left={true} text={page.module3Text} label={page.module3Label} image={page.module3Image.url} />
