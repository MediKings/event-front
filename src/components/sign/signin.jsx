import { Link, useNavigate } from 'react-router-dom'
import './sign.css'
import { useRef, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

function Signin() {

    const cookies = new Cookies()

    const navigate = useNavigate()
    const [message, setMessage] = useState('')

    const email = useRef()
    const password = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email.current.value || !password.current.value) {
            setMessage('Veillez remplir tous les champs')
        } else {
            try {
                const resp = await axios.post(
                    "https://event-back.vercel.app/api/signin", 
                    {
                        email: email.current.value, 
                        password: password.current.value
                    }
                )
                window.location.reload(true)
                const token = resp.data.token
                cookies.set("access_token", token, {
                    maxAge: 1000 * 1000 * 1000,
                    path: "*"
                })
            } catch (error) {
                setMessage(error.response.data)
            }
        }
    }

    return (
      <div className='sign-container'>
          <div className="sign-box">
            <div className="sign-bg"></div>
            <div className="sign-form">
                <h2 style={{marginBottom:'30px'}}>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email
                        <input ref={email} type="email" id='email' />
                    </label>
                    <label htmlFor="password">
                        Mot de passe
                        <input ref={password} type="password" id='password' />
                    </label>
                    {message && <small className="d-block pb-2 text-danger">{message}</small>}
                    <button type='submit'>Se connecter</button>
                    <small>Vous n'avez pas de compte, <Link to={"/auth/signup"}>S'inscrire</Link></small>
                </form>
            </div>
          </div>
      </div>
    )
  }
  
  export default Signin
  