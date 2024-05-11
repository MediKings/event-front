import React, { useEffect, useState } from 'react'
import './ProfileContent.css'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const ProfileContent = ({user}) => {

    const {id} = useParams()

  const cookies = new Cookies();
  const logout = () => {
      user = null;
      cookies.remove("access_token");
    //   window.location.reload()
      window.location.replace('/') 
  }

  const [myEvents, setMyEvents] = useState([])
  useEffect(() => {
    const fetchMyEvents = async () => {
      const resp = await axios.get(`https://event-back.vercel.app/api/myEvents/${user.id}`)
      setMyEvents(resp.data)
    }
    fetchMyEvents();
  }, []);

  const [myFollowedEvents, setMyFollowedEvents] = useState([])
  useEffect(() => {
    const fetchMyFollowedEvents = async () => {
      const resp = await axios.get(`https://event-back.vercel.app/api/getFollowedEvent/${user.id}`)
      setMyFollowedEvents(resp.data)
    }
    fetchMyFollowedEvents();
  }, []);

  return (
    <div className='container'>
        <div className="infos">
            <h4>Infos personnelles</h4>
            <table>
                <tbody>
                    <tr>
                        <td>Prénom : </td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.firstname}</td>
                    </tr>
                    <tr>
                        <td>Nom : </td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.lastname}</td>
                    </tr>
                    <tr>
                        <td>Email : </td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.email}</td>
                    </tr>
                    <tr>
                        <td><button className="btn btn-danger mt-3" onClick={()=>{logout()}}>Deconnexion</button> </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <hr />

        <div className="my-events">
            <h5>Mes évenements</h5>
            <div className="row m-0 event-list">
                {myEvents.map((event) => {
                    return (
                        <div className="col-md-6 col-lg-4 p-2" key={event.id}>
                            <div className="event">
                                <Link to={`/event/${event.id}`}><img src={`https://event-back.vercel.app/images/${event.image}`} alt="" /></Link>
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

        <hr />

        <div className="my-events">
            <h5>Mes participations</h5>
            <div className="row m-0 event-list">
                {myFollowedEvents.map((e) => {
                    return (
                        <div className="col-md-6 col-lg-4 p-2" key={e.id}>
                            <div className="event">
                                <Link to={`/event/${e.event.id}`}><img src={`https://event-back.vercel.app/images/${e.event.image}`} alt="" /></Link>
                                <Link to={`/event/${e.event.id}`} style={{textDecoration: "none", color: "chocolate"}}><h5>{e.event.title}</h5></Link>
                                <span className='text-muted'>{e.event.desc.length > 100 ? e.event.desc.substring(0, 100)+"..." : e.event.desc}</span>
                                <span>Lieu: {e.event.place}</span>
                                <span>Date: {new Date(e.event.startDate).toLocaleDateString()} {e.event.endDate && `au ${new Date(e.event.endDate).toLocaleDateString()}`}</span>
                                <span>Heure: {e.event.startHour} {e.event.endHour && `à ${e.event.endHour}`}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}
