import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

import Navbar from "../components/Navbar";

function RecipeDetails() {

  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // FETCH SELECTED RECIPE BY ID

  useEffect(() => {

    const fetchRecipeDetails = async () => {

      setLoading(true);
      setError("");

      try {

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch recipe details.");
        }

        const data = await response.json();

        if (data.meals && data.meals.length > 0) {

          setRecipe(data.meals[0]);

        } else {

          setError("Recipe not found.");

        }

      } catch (err) {

        setError("Unable to load recipe details. Please try again.");

      } finally {

        setLoading(false);

      }

    };

    fetchRecipeDetails();

  }, [id]);


  // GET INGREDIENTS AND MEASUREMENTS

  const getIngredients = () => {

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {

      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {

        ingredients.push({
          ingredient,
          measure
        });

      }

    }

    return ingredients;

  };


  return (

    <>

      <Navbar />

      <div className="details-container">

        <Link to="/" className="back-button">
          ← Back to Recipes
        </Link>


        {loading && (

          <p className="message">
            Loading recipe details...
          </p>

        )}


        {!loading && error && (

          <p className="error-message">
            {error}
          </p>

        )}


        {!loading && recipe && (

          <div className="details-content">

            <div className="details-header">

              <div className="details-image">

                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                />

              </div>


              <div className="details-info">

                <p className="details-label">
                  RECIPE DETAILS
                </p>

                <h1>{recipe.strMeal}</h1>

                <p>
                  <strong>Category:</strong>{" "}
                  {recipe.strCategory || "Not available"}
                </p>

                <p>
                  <strong>Cuisine:</strong>{" "}
                  {recipe.strArea || "Not available"}
                </p>

                {recipe.strTags && (

                  <p>
                    <strong>Tags:</strong> {recipe.strTags}
                  </p>

                )}

              </div>

            </div>


            <div className="recipe-information">

              <div className="ingredients-section">

                <h2>Ingredients</h2>

                <ul>

                  {getIngredients().map((item, index) => (

                    <li key={index}>

                      <span>{item.ingredient}</span>

                      <span>{item.measure}</span>

                    </li>

                  ))}

                </ul>

              </div>


              <div className="instructions-section">

                <h2>Cooking Instructions</h2>

                <p>
                  {recipe.strInstructions}
                </p>

              </div>

            </div>


            {recipe.strYoutube && (

              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-button"
              >
                Watch Cooking Video
              </a>

            )}

          </div>

        )}

      </div>


      <footer className="footer">

        <p>
          © 2026 Recipe Finder. Discover something delicious.
        </p>

      </footer>

    </>

  );

}

export default RecipeDetails;