import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import './FactsStatement.scss'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'

const query = `
{
  personalStatementCollection {
    items {
      personalStatement {
        json
      }
      headshot {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      fact1Key
      fact1Value
      fact2Key
      fact2Value
      fact3Key
      fact3Value
      fact4Key
      fact4Value
      fact5Key
      fact5Value
      fact6Key
      fact6Value
      fact7Key
      fact7Value
      fact8Key
      fact8Value
    }
  }
}
`

function FactsStatement({ responsive }) {
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

  const headshot = {
    backgroundImage:`url(${page.headshot.url})`,
    height: '215px',
    width: '300px',
    float: 'right'
  }

  const facts = {
    width: responsive ? '40%' : '100%'
  }

  const statement = {
    width: responsive ? '59%' : '100%'
  }

  return (
    <div className="factsStatement">
      <div className="container">
        <div className="facts" style={facts}>
          <h4>Facts, so to speak</h4>
          <div className="fact">
            <strong>{page.fact1Key}</strong>
            <span>{page.fact1Value}</span>
          </div>
          <div className="fact">
            <strong>{page.fact2Key}</strong>
            <span>{page.fact2Value}</span>
          </div>
          <div className="fact">
            <strong>{page.fact3Key}</strong>
            <span>{page.fact3Value}</span>
          </div>
          <div className="fact">
            <strong>{page.fact4Key}</strong>
            <span>{page.fact4Value}</span>
          </div>
          <div className="fact">
            <strong>{page.fact5Key}</strong>
            <span>{page.fact5Value}</span>
          </div>
          <div className="fact">
            <strong>{page.fact6Key}</strong>
            <span>{page.fact6Value}</span>
          </div>
          <div className="fact">
            <strong>{page.fact7Key}</strong>
            <span>{page.fact7Value}</span>
          </div>
          <div className="fact">
            <strong>{page.fact8Key}</strong>
            <span>{page.fact8Value}</span>
          </div>
          <h4>List of titles</h4>
          <span>Barista</span>
          <br />
          <span>Certified Spanish Translator</span>
          <br />
          <span>Summa Cum Laude</span>
          <br />
          <span>Grad school dropout</span>
          <br />
          <span>Company Founder (3x)</span>
          <br />
          <span>CEO (3x)</span>
          <br />
          <span>Consultant</span>
          <br />
          <span>Maître de table</span>
          <br />
          <span>Head waiter</span>
          <br />
          <span>Line cook/expo</span>
          <br />
          <span>Personal assistant</span>
          <br />
          <span>Apprentice</span>
          <br />
          <span>Head of Product</span>
          <br />
          <span>Head of Design</span>
          <br />
          <span>UX Developer</span>
          <br />
          <span>Senior Product Designer</span>
          <br />
          <span>Husband</span>
          <br />
          <span>Son</span>
          <br />
          <span>Brother</span>
          <br />
          <span>Friend</span>
          <br />
          <span>Daddy</span>
        </div>
        <div className="statement" style={statement}>
          <h4>A personal statement</h4>
          <div className="headshot" style={headshot} />
          {documentToReactComponents(page.personalStatement.json)}
        </div>
      </div>
    </div>
  )
}

export default FactsStatement;
