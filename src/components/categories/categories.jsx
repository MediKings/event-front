import axios from 'axios'
import './categories.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function CategoryList() {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchCats = async () => {
          const resp = await axios.get("https://event-back-ow5h.onrender.com/api/categories");
          setData(resp.data)
        }
        fetchCats();
    }, []);
    
  return (
    <div className="container">
        <h3 className='title'>Categories</h3>
        <Link to={"/addcategory"}>Ajouter une categorie</Link>
        <div className="row m-0">
            {data.map((item, i)=>{
                return (
                    <div className="col-12 p-2" key={i}>
                        <div className="">
                            <h5>{item.name}</h5>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default CategoryList
