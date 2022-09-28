import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Cocktail = ({image, name, id, info, glass}) => {
  const navigate = useNavigate();

  return (
    <article className="cocktail" onClick={() => navigate(`/cocktail/${id}`)}>
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className='btn btn-primary btn-details'>details</Link>
      </div>
    </article>
  )
}

export default Cocktail
