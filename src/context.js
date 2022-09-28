import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import cocktailFetch from './components/Interceptors'

const apiMethod = '/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);

    try {
      const response = await cocktailFetch(`${apiMethod}${searchTerm}`);
      const {drinks} = await response.data;

      if (drinks ) {
        const newCocktails = drinks.map((cocktail) => {
          const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = cocktail;
          return {id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass}
        });

        setCocktails(newCocktails);
      }
      else {
        setCocktails([]);
      }

    } catch(error) {
      console.log(error.response);
    }
    
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks])

  return (
    <AppContext.Provider value={
      {
        loading,
        cocktails,
        setSearchTerm,
      }
    }>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
