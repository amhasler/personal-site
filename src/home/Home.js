import '../app/App.scss';
import Hero from './hero/Hero'
import Trailer from './trailer/Trailer'
import Cases from './cases/Cases'
import Documents from './documents/Documents'
import Writing from './writing/Writing'
import PageOne from './pageone/PageOne'
{/* import Hireme from './hireme/Hireme' */}


function Home({ showTopNavMenu }) {

  //const showNav = {
  //  display: showTopNavMenu ? 'flex' : 'none'
  //}
  //const showContact = {
  //  display: showTopNavMenu ? 'flex' : 'none'
  //}
  //const showMenuIcon = {
  //  display: showTopNavMenu ? 'none' : 'flex',
  //}
  return (
    <>
     <Hero responsive={showTopNavMenu}/>
     <Trailer responsive={showTopNavMenu}/>
     <Cases responsive={showTopNavMenu}/>
     {/*<Hireme responsive={showTopNavMenu}/>*/}
     <Documents responsive={showTopNavMenu}/>
     <Writing responsive={showTopNavMenu}/>
     <PageOne responsive={showTopNavMenu}/>
     </>
  )
}

export default Home;
