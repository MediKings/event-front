import AboutContent from "../components/aboutContent/aboutContent"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import Signin from "../components/sign/signin"

function About({user}) {

  return (
    <div className="about">
      <Header user={user}/>
      <AboutContent/>
      <Footer/>
    </div>
  )
}

export default About
