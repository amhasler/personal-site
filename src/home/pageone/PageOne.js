import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import './PageOne.scss'

const query = `
{
	pageOneCollection {
    items {
      header
      subhead
      instagram {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      tiktok {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      youtube {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      mainImage {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
    }
  }
}`

function PageOne({ responsive }) {
  const [page, setPage] = useState(null);

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
        setPage(data.pageOneCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  //const boxContainer = {
  //  flexDirection: responsive ? 'row' : 'column'
  //}

  const instagram = {
    backgroundImage:`url(${page.instagram.url})`
  }

  const youtube = {
    backgroundImage:`url(${page.youtube.url})`
  }

  const tiktok = {
    backgroundImage:`url(${page.tiktok.url})`
  }

  const mainImage = {
    backgroundImage:`url(${page.mainImage.url})`
  }

  const columns = {
    flexDirection: responsive ? 'row' : 'column'
  }

  return (
     <div className="pageOne">
      <h1>{page.header}</h1>
      <svg viewBox="0 0 500 100" height="200px">
        <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
        <text width="500">
          <textPath href="#curve" startOffset="85">
            {page.subhead}
          </textPath>
        </text>
      </svg>
      <div className="columns" style={columns}>
        <div className="columnContainer">
          <div id="phone" style={mainImage} />
        </div>
        <div className="columnContainer">
          <a href="https://www.instagram.com/page_one_history/"><div className="social" style={instagram} /></a>
          <a href="https://www.youtube.com/@pageonekidsculturalhistory3371"><div className="social" style={youtube} /></a>
          {/* <a href="https://www.tiktok.com/@page_one_history"><div className="social" style={tiktok} /></a> */}
        </div>
      </div>
      <h5>More seasons bi-monthly!</h5>
     </div>
  )
}

export default PageOne;
