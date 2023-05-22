import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import './Hero.scss'
import image from "../../img/transition.png";

const query = `
{
	homeHeroCollection {
    items {
      headline
      heroSubhead
      heroPlate
      heroImage {
        url
      }
    }
  }
}
`

function Hero({ responsive }) {
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
        setPage(data.homeHeroCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  const transition = {
    backgroundImage:`url(${image})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    height:40,
    width:40,
		margin: '0px auto',
		float: 'none'
  }

  const cameo = {
    backgroundImage:`url(${page.heroImage.url})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    marginTop:0,
    height:500,
    width:350
  }

	const homeHero = {
		flexDirection: responsive ? 'row' : 'column'
	}

	const firstChild = {
		marginRight: responsive ? 80 : 0
	}

  return (
    <div className="hero" style={homeHero}>
			<div style={firstChild}>
	      <h1>{page.headline}</h1>
	      <h2>{page.heroSubhead}</h2>
	      <div id="transition" style={transition} />
	      <h3>{page.heroPlate}</h3>
			</div>
			<div>
      	<div id="hero-cameo" style={cameo} />
			</div>
    </div>
  )
}

export default Hero;
