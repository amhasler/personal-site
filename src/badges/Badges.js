import React, { useState, useEffect } from 'react'
import '../app/App.scss';
import HubspotForm from 'react-hubspot-form'
import { NavLink } from 'react-router-dom'

const query = `
{
	blogPostCollection(where: { topic: "badges"}) {
  	items {
      title
			slug
    }
  }
}`

function Badges({ showTopNavMenu }) {
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
        setPage(data.blogPostCollection.items);

      });
  }, []);



  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }

  console.log(page)

  return (
    <>
     <h1>Badges Coming soon</h1>
     {page.map(function(object, i){
        return <NavLink to={`/post/${object.slug}`}>{object.title}</NavLink>;
      })}
			<HubspotForm
			   portalId='23840634'
			   formId='1b744474-fd9a-44bd-86cf-95f70cc1769e'
			   onSubmit={() => console.log('Submit!')}
			   onReady={(form) => console.log('Form ready!')}
			   loading={<div>Loading...</div>}
			   />
    </>
  )
}

export default Badges;

/*
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    region: "na1",
    portalId: "23840634",
    formId: "1b744474-fd9a-44bd-86cf-95f70cc1769e"
  });
</script>
*/

//<Breakdown oneNumber={page.breakdown1Number} oneText={page.breakdown1Text} twoNumber={page.breakdown2Number} twoText={page.breakdown2Text}  threeNumber={page.breakdown3Number} threeText={page.breakdown3Text} />
//<CaseModule left={true} text={page.module1Text} label={page.module1Label} image={page.module1Image.url} />
//<CaseModule left={false} text={page.module2Text} label={page.module2Label} image={page.module2Image.url}  />
//<CaseModule left={true} text={page.module3Text} label={page.module3Label} image={page.module3Image.url} />
