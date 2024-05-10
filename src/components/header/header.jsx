import './header.css'
import NavBar from './navbar'
function Header({user}) {

  return (
    <header style={{height: '72px', backgroundPosition: 'top', marginBottom: '30px'}}>
      <NavBar user={user}/>
    </header>
  ) 
}

export default Header
