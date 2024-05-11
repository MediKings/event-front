import { useRef, useState } from 'react'
import './events.css'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function EventList({user}) {

    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
          const resp = await axios.get("https://event-back-ow5h.onrender.com/api/events")
          setEvents(resp.data)
        }
        fetchEvents();
    }, []);

  return (
    <div className="event-list container">
        <h3 className='title'>Tous les évenements</h3>
        <div className="row m-0">
            {events.map((event) => {
                return (
                    <div className="col-md-6 col-lg-4 p-2" key={event.id}>
                        <div className="event">
                            <small className="cat">{event.category?.name}</small>
                            <Link to={`/event/${event.id}`}><img src={`https://event-back-ow5h.onrender.com/images/${event.image}`} alt="" /></Link>
                            <Link to={`/event/${event.id}`} style={{textDecoration: "none", color: "chocolate"}}><h5>{event.title}</h5></Link>
                            <span className='text-muted'>{event.desc.length > 100 ? event.desc.substring(0, 100)+"..." : event.desc}</span>
                            <span>Lieu: {event.place}</span>
                            <span>Date: {new Date(event.startDate).toLocaleDateString()} {event.endDate && `au ${new Date(event.endDate).toLocaleDateString()}`}</span>
                            <span>Heure: {event.startHour} {event.endHour && `à ${event.endHour}`}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default EventList
