import { useState } from "react";
import IRecipeDetails from "../../interfaces/IRecipeDetails";
import { Link } from "react-router-dom";

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

  const [error, setError] = useState<string | null>(null);

  if (!recipe) {
    setError(error);
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>Author: {recipe.user}</p>
      <p>Categories: {recipe.categories}</p>
      <span>Servings: {recipe.servings}</span>
      <span>Vegan: {recipe.vegan !== "notvegan" ? "Yes" : "No"}</span>{" "}
      <span>Desperation Level: {recipe.desperation}</span>{" "}
      <span>Healthy Meter: {recipe.health}</span>
      <p>Last updated: {recipe.updatedAt}</p>
      <div>
        {
          <Link key={`link${recipe._id}`} to={`/recipes/${recipe._id}`}>
            View
          </Link>
        }
      </div>
      <p className="error">{error}</p>
    </div>
  );
};

export default PublicShortDetailedRecipe;
