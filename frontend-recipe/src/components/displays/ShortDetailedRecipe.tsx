import { useState } from "react";
import IRecipeDetails from "../../interfaces/IRecipeDetails";
import { useDeletePersonalRecipeMutation } from "../../slices/personalRecipeSlice";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { RecipeContext } from "../../context/RecipeContext.tsx";

interface IParams {
  recipe: IRecipeDetails;
}

const ShortDetailedRecipe = ({ recipe }: IParams) => {
  const { userInfo } = useSelector((state: any) => state.auth);
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

  const location = useLocation();
  const navigate = useNavigate();

  const [deleteRecipeAPICall] = useDeletePersonalRecipeMutation();

  const handleDeleteClick = async () => {
    try {
      await deleteRecipeAPICall(recipe._id).unwrap();
      console.log("deleted");

      //re-setRecipes to show only ones that are not deleted
      // const newRecipes = [...recipes].filter((thisRecipe) => {
      //   return thisRecipe._id !== recipe._id;
      // });
      // setRecipes(newRecipes);
      navigate("/dashboard");
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
      <h1>{recipe.title}</h1>
      <p>Categories: {recipe.categories}</p>
      <span>Servings: {recipe.servings}</span>{" "}
      <span>Vegan: {recipe.vegan ? "Yes" : "No"}</span>{" "}
      <span>Desperation Level: {recipe.desperation}</span>{" "}
      <span>Healthy Meter: {recipe.health}</span> <p>Author: {recipe.user}</p>
      {userInfo && location.pathname == "/dashboard" ? (
        <>
          <button onClick={handleEditClick}>EDIT</button>
          <button onClick={handleDeleteClick}>DELETE</button>
        </>
      ) : (
        <></>
      )}
      <Link key={`link${recipe._id}`} to={`/recipes/${recipe._id}`}>
        View
      </Link>
      <p className="error">{error}</p>
    </div>
  );
};

export default ShortDetailedRecipe;
