import { useState } from 'react'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'


function NavBar({user}) {

  const [showMenu, setShowMenu] = useState(false)

  return (
      <div className="container pt-2">
        <nav className='navbar justify-content-between align-items-center'>
          <Link to={"/"}><img src={viteLogo} width='50px' /></Link>
          <span className={showMenu?'menu-btn-right d-md-none':'menu-btn-left d-md-none'} onClick={()=>setShowMenu(!showMenu)}>MENU</span>
          <div className={showMenu?'show':'hide'} onClick={()=>setShowMenu(!showMenu)}>
            <ul className="nav">
              <li className='nav-item'><Link className='nav-link' onClick={()=>setShowMenu(false)} to={"/"}>Accueil</Link></li>
              {user?.admin === true && <li className='nav-item'><Link className='nav-link' onClick={()=>setShowMenu(false)} to={"/categories"}>Categories</Link></li>}
              <li className='nav-item'><Link className='nav-link' onClick={()=>setShowMenu(false)} to={"/events"}>Evenements</Link></li>
              <li className='nav-item'><Link className='nav-link' onClick={()=>setShowMenu(false)} to={"/addevent"}>Créer un évenement</Link></li>
              <li className='nav-item'><Link className='nav-link' onClick={()=>setShowMenu(false)} to={"/about"}>A propos</Link></li>
              {
                user
                ? (
                  <li className='nav-item conn'><Link className='nav-link text-white' onClick={()=>setShowMenu(false)} to={`/user/${user.id}`}>Profile</Link></li>
                )
                : <li className='nav-item conn'><Link className='nav-link text-white' onClick={()=>setShowMenu(false)} to={"/auth/signin"}>Connexion</Link></li>
              }
            </ul>
          </div>
        </nav>
      </div>
  ) 
}

export default NavBar
