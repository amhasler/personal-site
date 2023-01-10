import React, { useState, useEffect } from 'react'
import '../app/App.scss';
import Trailer from './trailer/Trailer'
import FactsStatement from './factsStatement/FactsStatement'
import Testimonial from './testimonial/Testimonial'
import Return from '../return/Return'

const query = `
{
  personalStatementCollection {
    items {
      testimonial1Name
      testimonial1Title
      testimonial1Company
      testimonial1 {
        json
      }
      testimonial2Name
      testimonial2Title
      testimonial2Company
      testimonial2 {
        json
      }
      testimonial3Name
      testimonial3Title
      testimonial3Company
      testimonial3 {
        json
      }
      testimonial4Name
      testimonial4Title
      testimonial4Company
      testimonial4 {
        json
      }
    }
  }
}`

function About({ showTopNavMenu }) {
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
        setPage(data.personalStatementCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  const headline = {
    textAlign: "center"
  }

  const testimonials = {
    backgroundColor: 'rgba(245,245,245,1)',
    width: '100%',
    overflow: 'auto'
  }

  const header = {
    color: 'black',
    textAlign: 'center',
    fontWeight: '300'
  }

  return (
    <>
     <h1 style={headline}>Champion, Scoundrel, &c.</h1>
     <Trailer responsive={showTopNavMenu}/>
     <FactsStatement responsive={showTopNavMenu}/>
     <div className="testimonials" style={testimonials}>
       <h1 style={header}>Testimonials</h1>
       <Testimonial name={page.testimonial1Name} title={page.testimonial1Title} company={page.testimonial1Company} testimonial={page.testimonial1} responsive={showTopNavMenu}/>
       <Testimonial name={page.testimonial2Name} title={page.testimonial2Title} company={page.testimonial2Company} testimonial={page.testimonial2} responsive={showTopNavMenu}/>
       <Testimonial name={page.testimonial3Name} title={page.testimonial3Title} company={page.testimonial3Company} testimonial={page.testimonial3} responsive={showTopNavMenu}/>
       <Testimonial name={page.testimonial4Name} title={page.testimonial4Title} company={page.testimonial4Company} testimonial={page.testimonial4} responsive={showTopNavMenu}/>
      </div>
      <Return gray={true} />
     </>
  )
}

export default About;
