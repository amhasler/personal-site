import '../../app/App.scss';
import './Testimonial.scss';
import quotes from "../../img/quotes.png";
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'



function Testimonial({ responsive, name, title, company, testimonial }) {
  /*
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
        //setPage(data.trailerModuleCollection.items[0]);
      });
  }, []);

  // show a loading screen case the data hasn't arrived yet
  if (!page) {
    return "Loading...";
  }
  */
  const titleStyle = {
    textTransform: 'uppercase',
    fontSize: '15px',
    marginTop:'15px'
  }

  const companyStyle = {
    textTransform: 'uppercase',
    fontSize: '15px'
  }

  const quoteStyle = {
    backgroundImage:`url(${quotes})`,
    backgroundRepeat: 'no-repeat',
    width:'55px',
    height:'35px',
    float:'left',
    marginTop:'10px'
  }

  const paragraph = {
    width: !responsive && '95%'
  }


  return (
    <div className="testimonial">
      <div className="circle">
        <span>{name}</span>
        <span style={titleStyle}>{title}</span>
        <span style={companyStyle}>{company}</span>
      </div>
      <div className="paragraph" style={paragraph}>
        <div style={quoteStyle} />
        {documentToReactComponents(testimonial.json)}
      </div>
    </div>
  )
}

export default Testimonial;
