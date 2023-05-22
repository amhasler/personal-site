import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import './Trailer.scss'
import { NavLink } from 'react-router-dom'

const query = `
{
	trailerModuleCollection {
    items {
      subhead
      trailerThumbnail {
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
}
`

function Trailer({ responsive }) {
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
        setPage(data.trailerModuleCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  const thumbnail = {
    backgroundImage:`url(${page.trailerThumbnail.url})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    height: responsive ? '390px' : '280px',
    width: responsive ? '700px' : '450px',
    border: '1px solid #585858'
  }

  return (
    <div className="trailer">
      <h2>{page.subhead }</h2>
      <NavLink to="/about"><div id="trailer-thumbnail" style={thumbnail} /></NavLink>
    </div>
  )
}

export default Trailer;
