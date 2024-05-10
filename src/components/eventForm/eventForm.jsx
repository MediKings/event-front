import { useEffect, useRef, useState } from 'react'
import './eventForm.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function EventForm({user}) {

    const [cats, setCats] = useState([])
    useEffect(() => {
        const fetchCats = async () => {
          const resp = await axios.get("http://localhost:5000/api/categories");
          setCats(resp.data)
        }
        fetchCats();
    }, []);

    const [emails, setEmails] = useState([])
    useEffect(() => {
        const fetchEmails = async () => {
            const resp = await axios.get(`http://localhost:5000/api/getEmails`)
            setEmails(resp.data)
        }
        fetchEmails();
    }, []);
    let mails='';
    emails.forEach((e)=>{
        mails += e.email+', '
    })
    console.log(mails);
        
    const navigate = useNavigate()
    const [message, setMessage] = useState('')

    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            setImage(img)
        }
    }

    const title = useRef()
    const desc = useRef()
    const catId = useRef()
    const place = useRef()
    const limit = useRef()
    const startDate = useRef()
    const endDate = useRef()
    const startHour = useRef()
    const endHour = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title.current.value || !desc.current.value || !place.current.value || !limit.current.value || !startDate.current.value || !startHour.current.value) {
            setMessage('Veillez remplir tous les champs')
        } else {
            const newEvent = {
                authorId: user.id, 
                categoryId: catId.current.value, 
                title: title.current.value, 
                desc: desc.current.value, 
                place: place.current.value, 
                limit: limit.current.value,
                startDate: startDate.current.value,
                endDate: endDate.current.value,
                startHour: startHour.current.value,
                endHour: endHour.current.value,
            }

            if(image) {
                const data = new FormData()
                const filename = Date.now() + image.name
                data.append("name", filename)
                data.append("file", image)
                newEvent.image = filename;
                console.log(newEvent)
                await axios.post("http://localhost:5000/api/upload", data)
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
            }

            try {
                const resp = await axios.post("http://localhost:5000/api/event", newEvent)
                console.log(resp);
                navigate("/events")
            } catch (error) {
                setMessage(error.response.data)
                console.log(error);
            }

        }                
    }


    return (
      <div className='container'>
          <div className="row mx-0 my-4">
            <div className="col-md-8 p-4 event-form">
                <h2 style={{marginBottom:'30px'}}>Créer un évenement</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">
                        Titre
                        <input ref={title} className="form-control" type="text" id='title' />
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea ref={desc} className='form-control' rows={5} id='description'></textarea>
                    </label>
                    <label htmlFor="catId">
                        Catégorie
                        <select ref={catId} defaultValue={""} className="form-control" id='catId'>
                            <option value="" disabled>----------</option>
                            {cats.map((cat)=>{
                                return (
                                    <option value={cat.id} key={cat.id}>{cat.name}</option> 
                                )
                            })}
                        </select>
                    </label>
                    <label htmlFor="place">
                        Lieu
                        <input ref={place} className="form-control" type="text" id='place' />
                    </label>
                    <label htmlFor="visitors">
                        Nombre de places
                        <input ref={limit} className="form-control" type="number" id='visitors' />
                    </label>
                    <label htmlFor="image">
                        Image
                        <input ref={imageRef} className="form-control" type="file" id='image' onChange={onImageChange} />
                    </label>

                    <div className="row m-0">
                        <div className="col-md-6 px-1">
                            <label htmlFor="start-date">
                                Date de debut
                                <input ref={startDate} className="form-control" type="date" id='start-date' />
                            </label>
                        </div>
                        <div className="col-md-6 px-1">
                            <label htmlFor="end-date">
                                Date de fin
                                <input ref={endDate} className="form-control" type="date" id='end-date' />
                            </label>
                        </div>
                    </div>

                    <div className="row m-0">
                        <div className="col-md-6 px-1">
                            <label htmlFor="start-time">
                                Heure de debut
                                <input ref={startHour} className="form-control" type="text" id='start-time' />
                            </label>
                        </div>
                        <div className="col-md-6 px-1">
                            <label htmlFor="end-time">
                                Heure de fin
                                <input ref={endHour} className="form-control" type="text" id='end-time' />
                            </label>
                        </div>
                    </div>
                    {message && <small className="d-block pb-2 text-danger">{message}</small>}
                    <button type='submit'>Créer l'évenement</button>
                </form>
            </div>
          </div>
      </div>
    )
  }
  
  export default EventForm
  