import React, { useState, useEffect } from 'react'
import '../../app/App.scss';
import CaseHero from '../hero/CaseHero'
import CaseModule from '../module/CaseModule'
import Breakdown from '../breakdown/Breakdown'

const query = `
{
  case1Collection {
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
      heroText
      breakdown1Number
      breakdown1Label
      breakdown2Number
      breakdown2Label
      breakdown3Number
      breakdown3Label
      module1Text
      module1Label
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
      module2Text
      module2Label
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
      module3Text
      module3Label
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
    }
  }
}`

function Case1({ showTopNavMenu }) {
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
        setPage(data.case1Collection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  return (
    <>
     <CaseHero responsive={showTopNavMenu} image={page.heroImage.url} text={page.heroText} />
     <Breakdown oneNumber={page.breakdown1Number} oneText={page.breakdown1Text} twoNumber={page.breakdown2Number} twoText={page.breakdown2Text}  threeNumber={page.breakdown3Number} threeText={page.breakdown3Text} />
     <CaseModule left={true} text={page.module1Text} label={page.module1Label} image={page.module1Image.url} />
     <CaseModule left={false} text={page.module2Text} label={page.module2Label} image={page.module2Image.url}  />
     <CaseModule left={true} text={page.module3Text} label={page.module3Label} image={page.module3Image.url} />
    </>
  )
}

export default Case1;
