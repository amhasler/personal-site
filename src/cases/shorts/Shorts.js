import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import CaseHero from '../hero/CaseHero'
import CaseModule from '../module/CaseModule'
import Return from '../../return/Return'

const query = `
{
  shortsCollection {
    items {
      heroImage {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      heroText {
        json
      }
      module1Text {
        json
      }
      module1Title
      module1Image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      module2Text {
        json
      }
      module2Title
      module2Image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      module3Text {
        json
      }
      module3Title
      module3Image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      module4Text {
        json
      }
      module4Title
      module4Image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      module5Text {
        json
      }
      module5Title
      module5Image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      module6Text {
        json
      }
      module6Title
      module6Image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      module7Text {
        json
      }
      module7Title
      module7Image {
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

function Shorts({ showTopNavMenu }) {
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
        setPage(data.shortsCollection.items[0]);


      });
  }, []);



  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  const modules = {
    backgroundColor: '#f5f5f5'
  }

  const rule = {
    width: "100%"
  }

  const header = {
    textAlign: 'center'
  }

  return (
    <>
      <h1 style={header}>Selected Shorts</h1>
     <CaseHero responsive={showTopNavMenu} image={page.heroImage.url} text={page.heroText} />
     <div className='modules' style={modules}>
       <CaseModule left={'left'} text={page.module1Text} title={page.module1Title} image={page.module1Image} />
       <hr style={rule} />
       <CaseModule left={'center'} text={page.module2Text} title={page.module2Title} image={page.module2Image} />
       <hr style={rule} />
       <CaseModule left={'right'} text={page.module3Text} title={page.module3Title} image={page.module3Image} />
       <hr style={rule} />
       <CaseModule left={'center'} text={page.module4Text} title={page.module4Title} image={page.module4Image} />
       <hr style={rule} />
       <CaseModule left={'right'} text={page.module5Text} title={page.module5Title} image={page.module5Image} />
       <hr style={rule} />
       <CaseModule left={'center'} text={page.module6Text} title={page.module6Title} image={page.module6Image} />
       <hr style={rule} />
       <CaseModule left={'right'} text={page.module7Text} title={page.module7Title} image={page.module7Image} />
      </div>
      <Return gray={true} />
    </>
  )
}

export default Shorts;

//<Breakdown oneNumber={page.breakdown1Number} oneText={page.breakdown1Text} twoNumber={page.breakdown2Number} twoText={page.breakdown2Text}  threeNumber={page.breakdown3Number} threeText={page.breakdown3Text} />
//<CaseModule left={true} text={page.module1Text} label={page.module1Label} image={page.module1Image.url} />
//<CaseModule left={false} text={page.module2Text} label={page.module2Label} image={page.module2Image.url}  />
//<CaseModule left={true} text={page.module3Text} label={page.module3Label} image={page.module3Image.url} />
