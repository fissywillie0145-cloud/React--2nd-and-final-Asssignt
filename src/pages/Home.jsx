import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";

function Home() {

  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  // FUNCTION TO FETCH RECIPES

  const fetchRecipes = async (search) => {

    if (!search.trim()) {
      setError("Please enter a meal name.");
      setRecipes([]);
      return;
    }

    setLoading(true);
    setError("");
    setRecipes([]);

    try {

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`
      );

      if (!response) {
        throw new Error("Something went wrong. Please try again.");
      }

      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("Sorry, no meals found. Try another search.");
      }

    } catch (err) {

      setError("Unable to fetch recipes. Please check your internet connection.");

    } finally {

      setLoading(false);

    }
  };


  // LOAD RECIPES WHEN THE PAGE OPENS

  useEffect(() => {

    fetchRecipes("chicken");

  }, []);


  // HANDLE SEARCH

  const handleSearch = (e) => {

    e.preventDefault();

    fetchRecipes(searchTerm);

  };


  // FETCH RANDOM RECIPE

  const getRandomRecipe = async () => {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

      if (!response) {
        throw new Error("Unable to fetch random recipe.");
      }

      const data = await response.json();

      if (data.meals && data.meals.length > 0) {

        const randomMeal = data.meals[0];

        navigate(`/recipe/${randomMeal.idMeal}`);

      } else {

        setError("Could not find a random recipe.");

      }

    } catch (err) {

      setError("Unable to fetch random recipe. Please try again.");

    } finally {

      setLoading(false);

    }
  };


  return (

    <>

      <Navbar />

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            DISCOVER SOMETHING DELICIOUS
          </p>

          <h1>
            Find Your Next <span>Favourite</span> Recipe
          </h1>

          <p>
            Explore delicious meals, discover new recipes
            and learn how to prepare your favourite dishes.
          </p>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />

          <button
            className="random-button"
            onClick={getRandomRecipe}
            disabled={loading}
          >
            Discover Random Recipe
          </button>

        </div>

      </section>


      <section className="recipes-section">

        <div className="section-heading">

          <p>EXPLORE MEALS</p>

          <h2>Discover Delicious Recipes</h2>

          <span>
            Find meals and get inspired in the kitchen.
          </span>

        </div>


        {loading && (

          <p className="message">
            Loading recipes, please wait...
          </p>

        )}


        {!loading && error && (

          <p className="error-message">
            {error}
          </p>

        )}


        {!loading && !error && recipes.length > 0 && (

          <RecipeList recipes={recipes} />

        )}

      </section>


      <footer className="footer">

        <p>
          © 2026 Recipe Finder. Discover something delicious.
        </p>

      </footer>

    </>

  );
}

export default Home;