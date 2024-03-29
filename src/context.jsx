import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

const AppContext = React.createContext()

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem("favorites");

    if (favorites) {
        favorites = JSON.parse(localStorage.getItem("favorites"))
    }
    else {
        favorites = []
    }

    return favorites;
}




const AppProvider = ({ children }) => {

    // const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    
    const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    // const details = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
    // // FOODS
    // const seaFood = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
    // const indian = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
    // const canadian = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
    // const Italian = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian"
    // const Japanese = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese"
    // const Mexican = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican"
    
    
    // --------------LOCAL___SERVER-----------------

    // const allMealsUrl = 'http://localhost:3000/api/v1/dishes';
    // const details = "http://localhost:3000/api/v1/dishes?strMeal="
    // // FOODS
    // const seaFood = "http://localhost:3000/api/v1/dishes"
    // const indian = "http://localhost:3000/api/v1/dishes?strArea=Indian"
    // const canadian = "http://localhost:3000/api/v1/dishes?strArea=Canadian"
    // const Italian = "http://localhost:3000/api/v1/dishes?strArea=Italian"
    // const Japanese = "http://localhost:3000/api/v1/dishes?strArea=Japanese"
    // const Mexican = "http://localhost:3000/api/v1/dishes?strArea=Mexican"
    

    // ------------REPLIT___SERVER----------------

    const allMealsUrl = 'https://food-api.lakshyarana.repl.co/api/v1/dishes';
    const details = "https://food-api.lakshyarana.repl.co/api/v1/dishes?strMeal="
    // FOODS
    const seaFood = "https://food-api.lakshyarana.repl.co/api/v1/dishes"
    const indian = "https://food-api.lakshyarana.repl.co/api/v1/dishes?strArea=Indian"
    const canadian = "https://food-api.lakshyarana.repl.co/api/v1/dishes?strArea=Canadian"
    const Italian = "https://food-api.lakshyarana.repl.co/api/v1/dishes?strArea=Italian"
    const Japanese = "https://food-api.lakshyarana.repl.co/api/v1/dishes?strArea=Japanese"
    const Mexican = "https://food-api.lakshyarana.repl.co/api/v1/dishes?strArea=Mexican"
    

    const data = 'https://randomuser.me/api/';

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());


    // console.log(meals);




    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            // const response = await axios(url)
            const { data } = await axios(url)
            console.log(data);
            
            // axios.get("https://food-api.lakshyarana.repl.co/api/v1/dishes").then(response => {
            //     console.log(response);
            // })
            
            if (data.meals) {
                setMeals(data.meals);
            }
            else {
                setMeals([]);
            }
            // axios
            //     .get(allMealsUrl)
            //     .then(function (response) {
            //         console.log(response);
            //     });
        }
        catch (error) {
            console.log(error.response);
        }
        setLoading(false)
    }

    const fetchMealsDetails = async (url) => {
        setLoading(true)
        try {
            // const response = await axios(url)
            const { data } = await axios(url)

            if (data.meals) {
                setSelectedMeal(data.meals);
            }
            else {
                setSelectedMeal([]);
            }
        }
        catch (error) {
            console.log(error.response);
        }
        setLoading(false)
    }

    // console.log(meals);


    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }
    const fetchSeaFood = () => {
        fetchMeals(seaFood)
    }
    const fetchIndian = () => {
        fetchMeals(indian)
    }
    const fetchCanadian = () => {
        fetchMeals(canadian)
    }
    const fetchItalian = () => {
        fetchMeals(Italian)
    }
    const fetchJapenese = () => {
        fetchMeals(Japanese)
    }
    const fetchMexican = () => {
        fetchMeals(Mexican)
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const addToFavorites = (idMeal) => {
        const alreadyFavorite = favorites.find(meal => meal.idMeal === idMeal)
        if (alreadyFavorite) return;

        const meal = meals.find(meal => meal.idMeal === idMeal)
        const updateFavorites = [...favorites, meal];
        setFavorites(updateFavorites);
        localStorage.setItem("favorites", JSON.stringify(updateFavorites))
    }

    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter(meal => meal.idMeal !== idMeal);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }


    useEffect(() => {
        fetchMeals(allMealsUrl)

    }, []);


    const selectMeal = (idMeal, favouriteMeal) => {

        // let meal;
        // if(favouriteMeal){
        //     meal = favorites.find( (meal) => meal.idMeal === idMeal)
        // }
        // else{
        //     meal = meals.find( (meal) => meal.idMeal === idMeal)
        // }
        var combine = details + idMeal;
        // console.log(combine);
        fetchMealsDetails(combine);

        // setSelectedMeal(meal);
        setShowModal(true);
    }


    useEffect(() => {
        if (!searchTerm) {
            return
        }
        fetchMeals(`${allMealsUrl}?strMeal=${searchTerm}`)
    }, [searchTerm])

    return (
        <AppContext.Provider value={{
            loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal
            , closeModal, addToFavorites, removeFromFavorites, favorites, fetchMexican, fetchJapenese, fetchItalian,
            fetchCanadian, fetchIndian, fetchSeaFood
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}


export { AppContext, AppProvider }