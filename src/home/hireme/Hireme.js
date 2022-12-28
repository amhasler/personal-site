import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import './Hireme.scss'

const query = `
{
	hireMeCollection {
    items {
 			header
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
      text
    }
  }
}`

function Hireme({ responsive }) {
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
    width:responsive ? '220px' : '230px',
    height:responsive ? '328px' : '344px'
  }

  return (
     <div className="hireme">
      <h4>{page.header}</h4>
      <div className="illustratedCameo" style={cameo}/>
      <p>{page.text}</p>
      <button>Learn more</button>
     </div>
  )
}

export default Hireme;
