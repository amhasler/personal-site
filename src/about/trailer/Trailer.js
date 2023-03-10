import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import './Trailer.scss'
import WistiaEmbed from './WistiaEmbed'

const query = `
{
  aboutTrailerCollection {
    items {
			id
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
        setPage(data.aboutTrailerCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  return (
    <div className="aboutTrailer">
      <WistiaEmbed hashedId={page.id} />
    </div>
  )
}

export default Trailer;

/*
<WistiaPlayer
  hashedId="dxotmfvcgl"
  videoFoam={false}
  playButton={true}
  style={{
    width: '640px',
    height: '360px',
  }}
/>
*/
