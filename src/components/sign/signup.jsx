import { Link, useNavigate } from 'react-router-dom'
import './sign.css'
import { useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Signup() {

    const cookies = new Cookies()

    const navigate = useNavigate()
    const [message, setMessage] = useState('')

    const firstname = useRef()
    const lastname = useRef()
    const email = useRef()
    const password = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!firstname.current.value || !lastname.current.value || !email.current.value || !password.current.value) {
            setMessage('Veillez remplir tous les champs')
        } else {
            try {
                const resp = await axios.post(
                    "https://event-back.vercel.app/api/signup", 
                    {
                        firstname: firstname.current.value, 
                        lastname: lastname.current.value, 
                        email: email.current.value, 
                        password: password.current.value
                    }
                )
                window.location.reload(true)
                const token = resp.data.token
                cookies.set("access_token", token, {
                    maxAge: 1000 * 1000 * 1000,
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
                <h2 style={{marginBottom:'30px'}}>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstname">
                        Prénom
                        <input ref={firstname} type="text" id='firstname' />
                    </label>
                    <label htmlFor="lastname">
                        Nom
                        <input ref={lastname} type="text" id='lastname' />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input ref={email} type="email" id='email' />
                    </label>
                    <label htmlFor="password">
                        Mot de passe
                        <input ref={password} type="password" id='password' />
                    </label>
                    {message && <small className="d-block pb-2 text-danger">{message}</small>}
                    <button type='submit'>S'inscrire</button>
                    <small>Vous avez déjà compte, <Link to={"/auth/signin"}>Se connecter</Link></small>
                </form>
            </div>
          </div>
      </div>
    )
  }
  
  export default Signup
  