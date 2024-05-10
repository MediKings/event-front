import EventList from "../components/events/events"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"

function Events({user}) {

  return (
    <>
        <Header user={user}/>
        <EventList user={user}/>
        <Footer/>
    </>
  )
}

export default Events
