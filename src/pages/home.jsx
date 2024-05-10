import Content from "../components/content/content"
import Footer from "../components/footer/footer"
import HeaderHome from "../components/header/headerHome"

function Home({user}) {

  return (
    <>
        <HeaderHome user={user}/>
        <Content user={user}/>
        <Footer/>
    </>
  )
}

export default Home
