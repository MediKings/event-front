import { useRef, useState } from 'react'
import './footer.css'
import axios from 'axios'

function Footer() {
  const [message, setMessage] = useState('')
  const input = useRef()
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const resp = await axios.post("http://localhost:5000/api/sendMail/welcome", {email: input.current.value})
        console.log(resp)
        setMessage("Merci d'avoir souscrit!")
      } catch (error) {
      console.log(error)
    }
  }

  return (
    <footer>
      <span>Inscrivez-vous à notre newsletter</span>
        {
          !message
            ? (
              <form onSubmit={handleSubmit}>
                  <input ref={input} type="email" name="email" required />
                  <button type='submit'>Envoyer</button>
              </form>
            )
            : <h4 style={{color: "chocolate"}}>{message}</h4>
        }
        <span>&copy; copyright 2024. All right reserved</span>
    </footer>
  ) 
}

export default Footer
