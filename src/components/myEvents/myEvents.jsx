import './myEvents.css'

function MyEventList() {

  return (
    <div className="event-list container">
        <h3 className='title'>Evenements récents</h3>
        <div className="row m-0 event-list">
            <div className="col-lg-6 p-2">
                <div className="row m-0 event">
                    <div className="col-5">
                        <img src="/banner.jpg" alt="" />
                    </div>
                    <div className="col-7">
                        <h5>Journée Informatique</h5>
                        <span>Lieu: UNIKIN</span>
                        <span>Date: 04/05/2024</span>
                        <span>Heure: 12h30 - 15h00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyEventList
