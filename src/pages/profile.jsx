import { ProfileContent } from "../components/ProfileContent/ProfileContent"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"

function Profile({user}) {

  return (
    <div className="Profile">
      <Header user={user}/>
      <ProfileContent user={user}/>
      <Footer/>
    </div>
  )
}

export default Profile
