import { useState } from 'react'
import './event.css'
import { useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function EventContent({user}) {

    const [event, setEvent] = useState([])
    const [msg, setMsg] = useState("")
    const param = useParams()

    let author;
    if(user){
        if(user.id === event.authorId){
            author = true
        } else {
            author = false
        }
    }

    let followed;
    event.followers?.forEach((item, i) => {
        if(user.id == item.authorId){
            followed = true
        } else {
            followed = false
        }
        console.log("user: ", user.id);
        console.log("follower: ", item.authorId);
    });

    useEffect(() => {
        const fetchEvent = async () => {
          const resp = await axios.get(`https://event-back-ow5h.onrender.com/api/event/${param.id}`)
          setEvent(resp.data)
        }
        fetchEvent();
    }, []);

    let userId;
    if(user){
        userId = user.id
    }
    const eventId = event.id

    const followEvent = async (e) => {
        e.preventDefault();
        if(!userId || !eventId) {
            setMsg('')
        } else {
            try {
                const resp = await axios.post(
                    "https://event-back-ow5h.onrender.com/api/followEvent", 
                    {
                        authorId: userId,
                        eventId: eventId,
                    }
                )
                setMsg("Ajouté avec succès")
                window.location.reload()
            } catch (error) {
                setMsg("")
            }
        }
    }

    return (
        <div className="event-list container">
            <h3 className='title'>Détails de l'évenement</h3>
            <div className="row m-0 event-list">
                <div className="col-md-5 col-lg-4 p-2">
                    <img src={`https://event-back-ow5h.onrender.com/images/${event.image}`} alt="" className='w-100' />
                </div>
                <div className="col-md-7 col-lg-8 p-2 mb-5">
                    <div className="d-flex align-items-center mb-3">
                        <h3 className='m-0'>{event.title}</h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <small style={{backgroundColor: "chocolate", color: "#fff", padding: "0 7px"}}>{event.category?.name}</small>
                    </div>
                    <p>{event.desc}</p>
                    <span><b>Lieu:</b> {event.place}</span> <br />
                    <span><b>Date:</b> {new Date(event.startDate).toLocaleDateString()} {event.endDate && `au ${new Date(event.endDate).toLocaleDateString()}`}</span> <br />
                    <span><b>Heure:</b> {event.startHour} {event.endHour && `à ${event.endHour}`}</span> <br /> <br />
                    
                    { !user
                        ? <Link to={"/auth/signin"} style={{backgroundColor: "chocolate", color: "#fff", fontSize: "1rem", padding: "8px 15px", textDecoration: "none"}}>Participer</Link> 
                        : author
                            ? <span style={{color: "chocolate", fontSize: "1.5rem", padding: "5px 0px"}}><b>{event.followers.length} participants / {event.limit}</b></span>
                            : followed
                                ? <span style={{backgroundColor: "green", color: "#fff", fontSize: "1rem", padding: "8px 15px", cursor: "pointer"}}>Vous participez à cette évenement</span>
                                : event.followers?.length == event.limit
                                    ? <span style={{backgroundColor: "grey", color: "#fff", fontSize: "1rem", padding: "8px 15px", cursor: "pointer"}}>Plus de place</span>
                                    : <span onClick={followEvent} style={{backgroundColor: "chocolate", color: "#fff", fontSize: "1rem", padding: "8px 15px", cursor: "pointer"}}>Participer</span>
                    }
                    
                    <br />{ msg && <small className='text-success p-2'>{msg}</small> }
                    
                </div>
            </div>
        </div>
    )
}

export default EventContent
