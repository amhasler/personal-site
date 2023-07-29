import React, { useState, useEffect } from 'react'
import '../app/App.scss';
import './Post.scss'
import Return from '../return/Return'
import { useParams } from 'react-router-dom'
import HubspotForm from 'react-hubspot-form'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
//import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom'
import RenderOptions from '../RenderOptions'
import YoutubeEmbed from "../utils/YoutubeEmbed";

function Post({ showTopNavMenu }) {
  const [page, setPage] = useState(null);

  const query = `query GetBlogPostBySlug($slug: String!) {
    blogPostCollection(where: {slug: $slug}, limit: 1) {
      items {
        title
        slug
        date
        topic
        postDescription {
          json
        }
        content {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                title
                width
                height
                description
                contentType
              }
            }
          }
        }
        externalUrl
      }
    }
  }`;

  const { slug } = useParams();

  useEffect(() => {

    const variables = { slug: slug }

    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/8sj1lftovdi0/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer FrqT2CJuMdseekDrrQVLamir4uDPKSn_e1uMXRWE8sA",
        },
        // send the GraphQL query
        body: JSON.stringify({ query, variables }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setPage(data.blogPostCollection.items[0]);

        console.log(data)

      });
  }, [query, slug]);



  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  const dateToFormat = new Date(page.date);

  const postMain = {
    maxWidth: showTopNavMenu ? '1210px' : '545px',
    margin: "0px auto",
    float: "none",
    padding: '0px 50px'
  }

  const formTitle = {
    textAlign: 'center'
  }

  const foot = {
    textAlign: 'center'
  }

  let pillar
  let path


  if (page.topic==="mental") {
    pillar = "Mind and Emotion"
    path = "/mentalhealth"
  } else if (page.topic==="sustainability") {
    pillar = "The Experience of Sustainability"
    path = "/sustainability"
  } else if (page.topic === "civic") {
    pillar = "Design and Public Policy"
    path = "/civic"
  } else if (page.topic ==="badges"){
    pillar = "The Adventurous Kid"
    path = "/badges"
  } else if (page.topic ==="pageone"){
    pillar = "Page One Kids Cultural History"
    path = "/pageone"
  } else if (page.topic ==="ethan"){
    pillar = "Buffa: A Comic Opera about Ethan Allen"
    path = "/ethan"
  } else if (page.topic ==="thirty"){
    pillar = "Thirty Years: A Work of Fiction"
    path = "/thirty"
  }

  const renderOptions = RenderOptions(page.content.links)

  return (
    <div className="container" style={postMain}>
     <h1>{page.title}</h1>
     <h2>{documentToReactComponents(page.postDescription.json)}</h2>
     <h2><Moment format="MMMM Do, YYYY" date={dateToFormat} /></h2>
     <div className="postContent">
     <div className="formContainer">
       <h2 style={formTitle}>Lset's keep talking</h2>
       <HubspotForm
          portalId='23840634'
          formId='1b744474-fd9a-44bd-86cf-95f70cc1769e'
          onSubmit={() => console.log('Submit!')}
          onReady={(form) => console.log('Form ready!')}
          loading={<div>Loading...</div>}
          />
     </div>
     {documentToReactComponents(page.content.json, renderOptions)}
     {page.externalUrl.map(function(object, i){
        return <YoutubeEmbed embedId={object} />;
      })}
      <p style={foot}><em>This is part of the {pillar} pillar. <NavLink to={path}>Visit the main pillar page</NavLink> to read more.</em></p>
     </div>
     <Return gray={false} />
    </div>
  )
}

export default Post;

//<Breakdown oneNumber={page.breakdown1Number} oneText={page.breakdown1Text} twoNumber={page.breakdown2Number} twoText={page.breakdown2Text}  threeNumber={page.breakdown3Number} threeText={page.breakdown3Text} />
//<CaseModule left={true} text={page.module1Text} label={page.module1Label} image={page.module1Image.url} />
//<CaseModule left={false} text={page.module2Text} label={page.module2Label} image={page.module2Image.url}  />
//<CaseModule left={true} text={page.module3Text} label={page.module3Label} image={page.module3Image.url} />
