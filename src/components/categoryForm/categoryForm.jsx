import { useRef, useState } from 'react'
import './categoryForm.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CategoryForm() {

    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!category) setMessage('Veillez remplir le champ')
        try {
            const resp = await axios.post("http://localhost:5000/api/category", {name:category})
            navigate("/categories")
        } catch (error) {
            setMessage(error.response.data)
        }
        
    }

    return (
      <div className='container'>
          <div className="row mx-0 my-4">
            <div className="col-md-8 p-4 event-form">
                <h2 style={{marginBottom:'30px'}}>Ajouter une categorie</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">
                        Nom
                        <input onChange={(e)=>{setCategory(e.target.value)}} className="form-control" type="text" id='name' />
                    </label>
                    {message && <small className="d-block pb-2 text-danger">{message}</small>}
                    <button>Ajouter</button>
                </form>
            </div>
          </div>
      </div>
    )
  }
  
  export default CategoryForm
  