import { Link } from "react-router";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <div className="recipe-card-body">

        <h3>{recipe.strMeal}</h3>

        <Link
          to={`/recipe/${recipe.idMeal}`}
          className="view-button"
        >
          View Recipe
        </Link>

      </div>

    </div>
  );
}

export default RecipeCard;