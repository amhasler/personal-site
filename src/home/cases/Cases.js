import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import './Cases.scss'
import { NavLink } from 'react-router-dom'
import image from "../../img/shelves.png";

const query = `
{
	casesCollection {
    items {
      subhead
			case1 {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      case2 {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      case3 {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      shorts {
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
        setPage(data.casesCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  const main = {
    backgroundImage:`url(${image})`,
    backgroundSize:"100% 490px",
    //width:'100%',
    //height: '490px',
    height: responsive ? '490px' : '982px',
    backgroundRepeat: responsive ? 'no-repeat' : 'repeat-y'
  }

  const subhead = {
    paddingTop:responsive ? '16px' : '18px',
    marginBottom: responsive ? '34px' : '30px',
    fontSize: responsive ? '2.25em' : '2em'
  }

  const case1 = {
    backgroundImage:`url(${page.case1.url})`,
    width:responsive ? '220px' : '230px',
    height:responsive ? '328px' : '344px',
    marginBottom: !responsive && '145px'
  }

  const case2 = {
    backgroundImage:`url(${page.case2.url})`,
    width:responsive ? '220px' : '230px',
    height:responsive ? '328px' : '344px',
    marginBottom: !responsive && '145px'
  }

  const case3 = {
    backgroundImage:`url(${page.case3.url})`,
    width:responsive ? '220px' : '230px',
    height:responsive ? '328px' : '344px'
  }

  const shorts = {
    backgroundImage:`url(${page.shorts.url})`,
    width:responsive ? '220px' : '230px',
    height:responsive ? '328px' : '344px'
  }

  const caseContainer = {
    padding: responsive ? '0px 100px 0px' : '0px 0px 0px 18%',
    width: !responsive && '75%',
    flexWrap: !responsive && "wrap"
    //flexDirection: responsive ? 'row' : 'column',
  }

  const link = {
    //margin: '0px 1%'
  }

  return (
    <div className="cases" style={main}>
      <h5 style={subhead}>{page.subhead }</h5>
      <div className="caseContainer" style={caseContainer}>
        <NavLink style={link} to="/case1"><div className="case1" style={case1}/></NavLink>
        <NavLink style={link} to="/case2"><div className="case2" style={case2}/></NavLink>
        <NavLink style={link} to="/case3"><div className="case3" style={case3} /></NavLink>
        <NavLink style={link} to="/shorts"><div className="shorts" style={shorts} /></NavLink>
      </div>
    </div>
  )
}

export default Trailer;