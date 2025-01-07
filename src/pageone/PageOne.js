import React, { useState, useEffect } from 'react'
import '../app/App.scss'
import './PageOne.scss'
import image from "../img/page-one-main.png"
import tiktokImage from "../img/tiktok.png"
import youtubeImage from "../img/youtube.png"
import instaImage from "../img/instagram.png"
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import { NavLink } from 'react-router-dom'

import FormContainer from '../formContainer/FormContainer'

const query = `
{
  pillarPage(id: "5gTI9FgZ8LUNTQJyZ8tbeu") {
    sys {
      id
    }
    text {
      json
    }
    header
  }
  blogPostCollection(where: { topic: "pageone"}) {
    items {
      title
      slug
    }
  }
}`

function PageOne({ showTopNavMenu }) {
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
  
  const hero = {
    backgroundColor: '#f5f5f5'
  }


  const heroContainer1 = {
    width: showTopNavMenu ? '49%' : '100%',
    height: showTopNavMenu ? '100%' : '300px',
    display: "flex",
    justifyContent: 'center'
  }

  const heroContainer2 = {
    width: showTopNavMenu ? '49%' : '100%',
    height: showTopNavMenu ? '100%' : '300px'
  }

  const header = {
    fontWeight: 'bold'
  }

  const subhead = {
    fill: '#8d1d28',
    fontFamily: 'Fanwood Text,serif',
    fontSize: '1.75em',
    textAlign: 'center',
    fontWeight: 'bold'
  }

  const mainImage = {
    height: 500,
    width: 200,
    backgroundImage:`url(${image})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    backgroundPosition:"center"
  }

  const insta = {
    height: 150,
    width: 150,
    backgroundImage:`url(${instaImage})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    backgroundPosition:"center"
  }

  const tiktok = {
    height: 150,
    width: 150,
    backgroundImage:`url(${tiktokImage})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    backgroundPosition:"center"
  }

  const youtube = {
    height: 150,
    width: 150,
    backgroundImage:`url(${youtubeImage})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    backgroundPosition:"center"
  }

  const path = {
    display: 'none'
  }

  return (
    <>
      <div className="hero" style={hero}>
        <div className="heroContainer" style={heroContainer1}>
          <div className="mainImage" style={mainImage} />
          <div className="stack">
            <a href="https://www.instagram.com/page_one_history/"><div className="stackImage" style={insta} /></a>
            <a href="https://www.tiktok.com/@page_one_history"><div className="stackImage" style={tiktok} /></a>
            <a href="https://www.youtube.com/@pageonekidsculturalhistory3371"><div className="stackImage" style={youtube} /></a>
          </div>
        </div>
        <div className="heroContainer" style={heroContainer2}>
          <h1 style={header}>Page One</h1>
          <svg viewBox="100 0 300 100" height="200px" width="100%">
            <path style={path} id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
            <text width="300" style={subhead} >
              <textPath href="#curve" startOffset="85">
                Kids Cultural History
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      <div className="postContent">
        <FormContainer />
        {documentToReactComponents(page.text.json)}
        <h1>Posts in this pillar:</h1>
        {collection.items.map(function(object, i){
           return <p key={i}><NavLink to={`../post/${object.slug}`}>{object.title}</NavLink></p>;
         })}
      </div>


    </>
  )
}

export default PageOne;

/*

 */

//<Breakdown oneNumber={page.breakdown1Number} oneText={page.breakdown1Text} twoNumber={page.breakdown2Number} twoText={page.breakdown2Text}  threeNumber={page.breakdown3Number} threeText={page.breakdown3Text} />
//<CaseModule left={true} text={page.module1Text} label={page.module1Label} image={page.module1Image.url} />
//<CaseModule left={false} text={page.module2Text} label={page.module2Label} image={page.module2Image.url}  />
//<CaseModule left={true} text={page.module3Text} label={page.module3Label} image={page.module3Image.url} />
