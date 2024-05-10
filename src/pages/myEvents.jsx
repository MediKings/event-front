import Header from "../components/header/header"
import MyEventList from "../components/myEvents/myEvents"

function MyEvents({user}) {

  return (
    <>
        <Header user={user}/>
        <MyEventList/>
    </>
  )
}

export default MyEvents
