import React, { useState, useEffect } from 'react'
import '../app/App.scss';
import './Post.scss'
import Return from '../return/Return'
import { useParams } from 'react-router-dom'
import HubspotForm from 'react-hubspot-form'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import Moment from 'react-moment';

function Post({ showTopNavMenu }) {
  const [page, setPage] = useState(null);

  const query = `query GetBlogPostBySlug($slug: String!) {
    blogPostCollection(where: {slug: $slug}) {
      items {
        title
        slug
        date
        postDescription {
          json
        }
        content {
          json
        }
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

  return (
    <div className="container" style={postMain}>
     <h1>{page.title}</h1>
     <h2>{documentToReactComponents(page.postDescription.json)}</h2>
     <h2><Moment format="MMMM Do, YYYY" date={dateToFormat} /></h2>
     <div className="postContent">
      {documentToReactComponents(page.content.json)}
     </div>
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
     <Return gray={false} />
    </div>
  )
}

export default Post;

//<Breakdown oneNumber={page.breakdown1Number} oneText={page.breakdown1Text} twoNumber={page.breakdown2Number} twoText={page.breakdown2Text}  threeNumber={page.breakdown3Number} threeText={page.breakdown3Text} />
//<CaseModule left={true} text={page.module1Text} label={page.module1Label} image={page.module1Image.url} />
//<CaseModule left={false} text={page.module2Text} label={page.module2Label} image={page.module2Image.url}  />
//<CaseModule left={true} text={page.module3Text} label={page.module3Label} image={page.module3Image.url} />
