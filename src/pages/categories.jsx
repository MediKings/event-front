// import EventList from "../components/events/events"
import CategoryList from "../components/categories/categories"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"

function Categories({user}) {

  return (
    <>
        <Header user={user}/>
        <CategoryList/>
        <Footer/>
    </>
  )
}

export default Categories
