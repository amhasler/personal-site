import '../../app/App.scss';
import './CaseHero.scss';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'


function CaseHero({ responsive, image, text }) {

  const imageContainer = {
    width: '407px',
    height: '570px',
    float: 'left',
    marginRight: '30px'
  }

  const paragraphContainer = {
    width: '640px',
    height: '599px',
    float: 'left',
  }

  const imageStyle = {
    backgroundImage:`url(${image})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    height:'104%'
  }

  const mainContainer = {
    maxWidth: '1080px',
    margin: '50px auto 50px',
    float: 'none',
    overflow: 'auto'
  }

  return (
    <>
      <div className='caseHero' style={mainContainer}>
        <div className="imageContainer" style={imageContainer}>
          <div className="image" style={imageStyle} />
        </div>
        <div className="paragraphContainer" style={paragraphContainer}>
          {documentToReactComponents(text.json)}
        </div>
      </div>
    </>
  )
}

export default CaseHero;
