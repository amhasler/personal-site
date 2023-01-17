import '../../app/App.scss';
import './CaseModule.scss'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'


function Breakdown({ responsive, text, title, image, left }) {

  const leftCircle = {
    backgroundColor: '#B28859',
    left: '0%',
    top: '0%',
    height: responsive ? '600px' : '400px',
    width: responsive ? '600px' : '400px'
  }

  const centerCircle = {
    backgroundColor: '#8D1D28',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    top: '0%',
    height: responsive ? '600px' : '400px',
    width: responsive ? '600px' : '400px'
  }

  const rightCircle = {
    backgroundColor: '#2B353D',
    right: '0%',
    top: '0%',
    height: responsive ? '600px' : '400px',
    width: responsive ? '600px' : '400px'
  }

  const leftImage = {
    backgroundImage:`url(${image.url})`,
    position: 'absolute',
    left: '5%',
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    width: responsive ? '550px' : '480px',
    height: '550px',
    marginTop: '25px'
  }

  const rightImage = {
    backgroundImage:`url(${image.url})`,
    position: 'absolute',
    right: responsive ? '5%' : '3%',
    backgroundRepeat:"no-repeat",
    backgroundSize:"contain",
    width: responsive ? '550px' : '480px',
    height: '550px',
    marginTop: '25px'
  }

  const rightText = {
    right: '0%',
    width: !responsive && '100%',
    marginTop: responsive ? '120px' : '300px'
  }

  const leftText = {
    left: '0%',
    width: !responsive && '100%',
    marginTop: responsive ? '120px' : '300px'
  }

  const container = {
    width: responsive ? '1080px' : '95%',
  }

  const caseModule = {
    height: responsive ? '720px' : '880px'
  }

  return (
    <div className='caseModule' style={caseModule}>
      <div className="moduleContainer" style={container}>
        <div className="circle" style={left === "left" ? leftCircle : left === "center" ? centerCircle : rightCircle } />
        <div className="moduleImage" style={left === "left" ? rightImage : leftImage } />
        <div className="moduleText" style={left === "left" ? leftText : rightText } >
          <h5>{title}</h5>
          {documentToReactComponents(text.json)}
        </div>
      </div>
    </div>
  )
}

export default Breakdown;

//
