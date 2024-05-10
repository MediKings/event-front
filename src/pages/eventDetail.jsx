import EventContent from "../components/event/event"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"

function EventDetail({user}) {

  return (
    <>
        <Header user={user}/>
        <EventContent user={user}/>
        <Footer/>
    </>
  )
}

export default EventDetail
