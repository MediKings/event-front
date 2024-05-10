import EventForm from "../components/eventForm/eventForm"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"

function AddEvent({user}) {

  return (
    <>
        <Header user={user}/>
        <EventForm user={user}/>
        <Footer/>
    </>
  )
}

export default AddEvent
