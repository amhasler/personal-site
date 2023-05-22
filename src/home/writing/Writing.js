import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import './Writing.scss'
import { NavLink } from 'react-router-dom'

const query = `
{
	writingCollection {
    items {
 			subhead
      thumbnail1 {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      title1
      thumbnail2 {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      title2
      thumbnail3 {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      title3
			thumbnail4 {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      title4
    }
  }
}`

function Documents({ responsive }) {
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
        setPage(data.writingCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  const boxContainer = {
    flexDirection: responsive ? 'row' : 'column'
  }

  const box1 = {
    backgroundImage:`url(${page.thumbnail1.url})`
  }

  const box2 = {
    backgroundImage:`url(${page.thumbnail2.url})`
  }

  const box3 = {
    backgroundImage:`url(${page.thumbnail3.url})`
  }

	const box4 = {
    backgroundImage:`url(${page.thumbnail4.url})`
  }

  return (
     <div className="writing">
      <h2>{page.subhead}</h2>
      <div className="boxContainer" style={boxContainer}>
        <div className="box">
            <NavLink to="./sustainability"><div className="boxThumbnail" style={box1}/></NavLink>
            <p>{page.title1}</p>
        </div>
        <div className="box">
          <NavLink to="./mentalHealth"><div className="boxThumbnail" style={box2}/></NavLink>
          <p>{page.title2}</p>
        </div>
        <div className="box">
          <NavLink to="./badges"><div className="boxThumbnail" style={box3}/></NavLink>
          <p>{page.title3}</p>
        </div>
				<div className="box">
          <NavLink to="./civic"><div className="boxThumbnail" style={box4}/></NavLink>
          <p>{page.title4}</p>
        </div>
      </div>
     </div>
  )
}

export default Documents;
