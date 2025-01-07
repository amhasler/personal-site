import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import './Documents.scss'
import image from "../../img/arrow.png";

const query = `
{
	documentsCollection {
    items {
 			header
      cvText
      resumeText
      portfolioText
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
        setPage(data.documentsCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  const arrow = {
    backgroundImage:`url(${image})`,
    width:'50px',
    height:'50px',
    margin: '0px'
  }

  const boxContainer = {
    flexDirection: responsive ? 'row' : 'column'
  }

  return (
     <div className="documents">
      <h3>{page.header}</h3>
      <div className="boxContainer" style={boxContainer}>
        <div className="box">
          <h2>Résumé (extended)</h2>				
          <p>{page.cvText}</p>
          <a href="https://assets.ctfassets.net/8sj1lftovdi0/6LemyayWyK0gsFc7Er1jn/836e9ee56f542d897b49b81c40876047/CV.pdf" target="_blank" rel="noreferrer">
	          <div className="link">
	            <span>View now</span>
	            <div className="arrow" style={arrow} />
	          </div>
          </a>
        </div>
        <div className="box">
          <h2>Résumé</h2>
          <p>{page.resumeText}</p>
          <a href="https://assets.ctfassets.net/8sj1lftovdi0/74kRumrMMfGnnxvMlK6Q3D/db80e598948c53e2505002d3a0f9d4a3/Resume.pdf" target="_blank" rel="noreferrer">
            <div className="link">
              <span>View now</span>
              <div className="arrow" style={arrow} />
            </div>
          </a>
        </div>
        <div className="box">
          <h2>Portfolio of Work</h2>
          <p>{page.portfolioText}</p>
					<a href="https://assets.ctfassets.net/8sj1lftovdi0/3pAPaB8PznQcIzktaMYwUO/077cf3ecebcac1950a54e3cbc14fd332/Portfolio_AMHasler.pdf" target="_blank" rel="noreferrer">
	          <div className="link">
	            <span>View now</span>
	            <div className="arrow" style={arrow} />
	          </div>
					</a>
        </div>
      </div>
     </div>
  )
}

export default Documents;
