import { useState } from "react";
import IRecipeDetails from "../../interfaces/IRecipeDetails";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// import { RecipeContext } from "../../context/RecipeContext.tsx";

interface IParams {
  recipe: IRecipeDetails;
}

const PublicShortDetailedRecipe = ({ recipe }: IParams) => {
  // const { recipes, setRecipes } = useContext(RecipeContext);
  // const [recipes, setRecipes] = useState({
  //   title: "",
  //   servings: 1,
  //   author: "",
  //   vegan: false,
  //   desperation: 0,
  //   health: 0,
  // });

  // const [error, setError] = useState<string | null>(null);

  if (!recipe) {
    // setError(error);
    toast.dark("Something went wrong. Cannot get the recipe");
  }

  return (
    <div className="recipeDetails">
      <h1>{recipe.title}</h1>
      <p>Chef: {recipe.user}</p>
      <p>Categories: {recipe.categories}</p>
      <div className="recipeMoreDetails">
        <span>Servings: {recipe.servings}</span>{" "}
        <span>Vegan: {recipe.vegan !== "notvegan" ? "✔️" : "✖️"}</span>{" "}
        <span>
          Desperation Level:{" "}
          <span className="recipeDetailsHealth">{recipe.desperation}</span>
        </span>{" "}
        <span>
          Healthy Meter:{" "}
          <span className="recipeDetailsHealth">{recipe.health}</span>
        </span>
      </div>
      <p className="recipeDetailstime">
        Last updated: {recipe.updatedAt.slice(0, 10)}
      </p>
      <div>
        {
          <Link key={`link${recipe._id}`} to={`/recipes/${recipe._id}`}>
            View
          </Link>
        }
      </div>
      {/* <p className="error">{error}</p> */}
    </div>
  );
};

export default PublicShortDetailedRecipe;
