import { useContext, useState } from "react";
import IRecipeDetails from "../../interfaces/IRecipeDetails";
import { useDeletePersonalRecipeMutation } from "../../slices/personalRecipeSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { RecipeContext } from "../../context/RecipeContext";

interface IParams {
  recipe: IRecipeDetails;
}

const ShortDetailedRecipe = ({ recipe }: IParams) => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const { recipes, setRecipes } = useContext(RecipeContext);

  const [error, setError] = useState<string | null>(null);

  const title = recipe.title;
  const categories = recipe.categories;
  const servings = recipe.servings;
  const author = recipe.user;
  const vegan = recipe.vegan;
  const desperation = recipe.desperation;
  const health = recipe.health;

  const location = useLocation();
  const navigate = useNavigate();

  const [deleteRecipeAPICall] = useDeletePersonalRecipeMutation();

  const handleDeleteClick = async () => {
    try {
      await deleteRecipeAPICall(recipe._id).unwrap();
      console.log("deleted");

      //re-setRecipes to show only ones that are not deleted
      const newRecipes = [...recipes].filter((thisRecipe) => {
        return thisRecipe._id !== recipe._id;
      });
      setRecipes(newRecipes);
    } catch (error) {
      setError("Cant delete");
      console.log(error);
    }
  };

  const handleEditClick = () => {
    navigate(`/dashboard/edit/${recipe._id}`);
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>Categories: {categories}</p>
      <span>Servings: {servings}</span>{" "}
      <span>Vegan: {vegan ? "Yes" : "No"}</span>{" "}
      <span>Desperation Level: {desperation}</span>{" "}
      <span>Healthy Meter: {health}</span> <p>Author: {author}</p>
      {userInfo && location.pathname == "/dashboard" ? (
        <>
          <button onClick={handleEditClick}>EDIT</button>
          <button onClick={handleDeleteClick}>DELETE</button>
        </>
      ) : (
        <></>
      )}
      <p className="error">{error}</p>
    </div>
  );
};

export default ShortDetailedRecipe;
