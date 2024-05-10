import './header.css'
import NavBar from './navbar'
function HeaderHome({user}) {

  return (
    <header>
      <NavBar user={user}/>
      <h1>Baobab-Event</h1>
    </header>
  ) 
}

export default HeaderHome
