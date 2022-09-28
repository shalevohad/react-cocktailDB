import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import cocktailFetch from '../components/Interceptors'
const apiMethod = '/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false)
  const [cocktail, setCocktail] = useState(null)

  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const resp = await cocktailFetch(`${apiMethod}${id}`);
        const {drinks} = await resp.data
        if (drinks) {
          const {strDrink:name, strDrinkThumb:image, strAlcoholic:info,strCategory:category,strGlass:glass,strInstructions:instructions,strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5} = drinks[0]
          const ingredients = [strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5]
          const newCocktail = {
            name, image, info, category, glass, instructions, ingredients
          }
          setCocktail(newCocktail);
        }
        else {
          setCocktail(null);
        }
      } catch(error) {
        console.log(error.response);
      }

      setLoading(false);
    }

    getCocktail();
  }, [id])
  if(loading) {
    return <Loading />
  }

  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>
  }

  const {name, image, info, category, glass, instructions, ingredients} = cocktail
  return (
    <article className='section cocktail-section'>
      <Link to="/" className='btn btn-primary'>back home</Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingedients :</span>
            {
              ingredients.map((item, index) => {
                return item ? <span key={index}>{item}</span> : null
              })
            }
          </p>
        </div>
      </div>
    </article>
  )
}

export default SingleCocktail
