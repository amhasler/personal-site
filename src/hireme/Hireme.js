import React, { useState, useEffect } from 'react'
import '../app/App.scss';

const query = `
{
  hireMeCollection {
    items {
      cameo {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      comic {
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

function Hireme({ showTopNavMenu }) {
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
        setPage(data.hireMeCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  const cameo = {
    backgroundImage:`url(${page.cameo.url})`,
    width:'250px',
    height:'310px',
    backgroundRepeat: 'no-repeat',
    margin: '0px auto',
    float: 'none'
  }

  const comic = {
    backgroundImage:`url(${page.comic.url})`,
    //maxWidth: '90%',
    height: showTopNavMenu ? '2300px' : '1030px',
    width: '100%',
    maxWidth: showTopNavMenu ? '1210px' : '545px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    margin: '0px auto',
    float: 'none'
  }

  const hireMePage = {
    paddingTop: '30px'
  }

  const hireMeHeader = {
    textAlign: 'center',
    fontSize: showTopNavMenu ? '3.5em' : '2.5em'
  }


  return (
     <div className="hireMePage" style={hireMePage}>
      <div className="illustratedCameo" style={cameo}/>
      <h1 style={hireMeHeader}>Hiring Adam: A Love Story</h1>
      <div className="comic" style={comic}/>
     </div>
  )
}

export default Hireme;
