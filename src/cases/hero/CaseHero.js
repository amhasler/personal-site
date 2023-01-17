import '../../app/App.scss';
import './CaseHero.scss';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'


function CaseHero({ responsive, image, text }) {

  const imageContainer = {
    width: '370px',
    height: '530px',
    float: responsive ? 'left' : 'none',
    margin: responsive ? '0px 30px 0px 0px' : '0px auto 50px'
  }

  const paragraphContainer = {
    width: responsive ? '640px' : '100%',
    height: responsive ? '599px' : 'auto',
    float: 'left',
    padding: '0px 20px'
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
