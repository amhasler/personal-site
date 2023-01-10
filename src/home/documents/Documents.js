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
          <h2>Curriculum Vitae</h2>
					<a href="https://assets.ctfassets.net/8sj1lftovdi0/7EzPspr7kRXint13NhMTHV/2ab239b8fb02967788b90ff41a099519/CV-AdamHasler.pdf" target="_blank" rel="noreferrer">
	          <p>{page.cvText}</p>
	          <div className="link">
	            <span>View now</span>
	            <div className="arrow" style={arrow} />
	          </div>
					</a>
        </div>
        <div className="box">
          <h2>Résumé</h2>
          <p>{page.resumeText}</p>
          <a href="https://assets.ctfassets.net/8sj1lftovdi0/LkmvJdAzC3ciMuCu6I6Qs/b228429999103de0093e9891c5785a2d/resume-AHaslser.pdf" target="_blank" rel="noreferrer">
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
