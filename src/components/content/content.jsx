import { Link } from 'react-router-dom'
import './content.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


function Content({user}) {

    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
          const resp = await axios.get("http://localhost:5000/api/eventsHome")
          setEvents(resp.data)
        }
        fetchEvents();
    }, []);

  return (
    <main>
        <div className="top">
            <h3 className='title'>Créez et gérez des évenements de manière éfficace <br /> grace à notre plateforme</h3>
            <div className="row m-0">
                <div className="col-md-6 col-lg-3 text-center mb-3">
                    <img src="/icones/icon_1.png" alt="" /> <br />
                    <span>Inscription</span>
                </div>
                <div className="col-md-6 col-lg-3 text-center mb-3">
                    <img src="/icones/icon_2.png" alt="" /> <br />
                    <span>Création évenement</span>
                </div>
                <div className="col-md-6 col-lg-3 text-center mb-3">
                    <img src="/icones/icon_3.png" alt="" /> <br />
                    <span>Gestion des participants</span>
                </div>
                <div className="col-md-6 col-lg-3 text-center mb-3">
                    <img src="/icones/icon_4.png" alt="" /> <br />
                    <span>Rappel par mail</span>
                </div>
            </div>
        </div>

        <div className="bg">
            <h2>Avec Pitch Deck, créez et gerez vos évenements <br /> n'a jamais été aussi simple et rapide</h2>
            {
                user
                ? <Link to={"/addEvent"}>Commencer</Link>
                : <Link to={"/auth/signin"}>Commencer</Link>
            }
        </div>

        <div className="bottom">
            <h3 className='title'>Evenements réçents</h3>
            <div className="row m-0 event-list">
            {events.map((event) => {
                return (
                    <div className="col-md-6 col-lg-4 p-2" key={event.id}>
                        <div className="event">
                            <small className="cat">{event.category?.name}</small>
                            <Link to={`/event/${event.id}`}><img src={`http://localhost:5000/images/${event.image}`} alt="" /></Link>
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
    </main>
  ) 
}

export default Content