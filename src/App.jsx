import { useState } from 'react'
import './App.css'
import Signup from './components/sign/signup'
import About from './pages/about'
import AddCategory from './pages/addCategory'
import AddEvent from './pages/addEvent'
import Auth from './pages/auth'
import Categories from './pages/categories'
import Events from './pages/events'
import Home from './pages/home'
import MyEvents from './pages/myEvents'
import { Routes, Route, Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'universal-cookie'
import EventDetail from './pages/eventDetail'
import Profile from './pages/profile'

function App() {

  const cookies = new Cookies();

  let user = null;

  if(cookies.get("access_token")) {
    const decoded = jwtDecode(cookies.get("access_token"))
    user = decoded;
    console.log(decoded)
  } else {
    user = null;
  }


  return (
    <Routes>
      <Route path='/' element={<Home user={user}/>}></Route>
      <Route path='/auth/signin' element={user?<Navigate to={"/"}></Navigate>:<Auth/>}></Route>
      <Route path='/auth/signup' element={user?<Navigate to={"/"}></Navigate>:<Signup/>}></Route>
      <Route path='/user/:id' element={!user?<Navigate to={"/"}></Navigate>:<Profile user={user}/>}></Route>
      {user && <Route path='/addcategory' element={user.admin===false?<Navigate to={"/"}></Navigate>:<AddCategory user={user}/>}></Route>}
      {user && <Route path='/categories' element={user.admin===false?<Navigate to={"/"}></Navigate>:<Categories user={user}/>}></Route>}
      <Route path='/addevent' element={!user?<Navigate to={"/auth/signin"}></Navigate>:<AddEvent user={user}/>}></Route>
      <Route path='/events' element={<Events user={user}/>}></Route>
      <Route path='/event/:id' element={<EventDetail user={user}/>}></Route>
      <Route path='/about' element={<About user={user}/>}></Route>
    </Routes>
  )
}

export default App
