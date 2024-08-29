import { useEffect, useState } from "react";
import IRecipeDetails from "../../interfaces/IRecipeDetails";
import {
  useDeletePersonalRecipeMutation,
  useGetPersonalRecipeProceduresMutation,
} from "../../slices/personalRecipeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setRecipes } from "../../slices/recipesSlice";
import { toast } from "react-toastify";
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
  const recipes = useSelector((state: any) => state.recipes.state);

  // const [error, setError] = useState<string | null>(null);
  const [procedures, setProcedures] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteRecipeAPICall] = useDeletePersonalRecipeMutation();

  const [getRecipeProceduresAPICall] = useGetPersonalRecipeProceduresMutation();

  const fetchRecipeProcedures = async () => {
    try {
      const res = await getRecipeProceduresAPICall(recipe._id).unwrap();
      setProcedures(res);
      //if user did not click cancel or share recipe during the creation of procedures, recipe will be deleted

      if (res[0] == undefined) {
        handleDeleteClick();
      }
    } catch (err) {
      console.log(err);
      // setError("Something went wrong. Cannot get procedures");
      toast.dark("Something went wrong. Cannot get the procedures");
    }
  };

  useEffect(() => {
    fetchRecipeProcedures();
  }, []);

  const handleDeleteClick = async () => {
    try {
      await deleteRecipeAPICall(recipe._id).unwrap();
      // console.log("deleted");

      //re-setRecipes to show only ones that are not deleted
      const newRecipes = [...recipes].filter((thisRecipe) => {
        return thisRecipe._id !== recipe._id;
      });
      dispatch(setRecipes(newRecipes));
      navigate("/dashboard");
      toast.dark("Cancelled sharing recipe");
    } catch (error) {
      // setError("Cant delete");
      toast.dark("Something went wrong. Cannot get delete");
      console.log(error);
    }
  };

  const handleEditClick = () => {
    navigate(`/dashboard/edit/${recipe._id}`);
  };

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
        Last updated: {recipe.updatedAt && <>{recipe.updatedAt.slice(0, 10)}</>}
      </p>
      <div>
        {procedures && userInfo && location.pathname == "/dashboard" ? (
          <>
            <button onClick={handleEditClick}>EDIT</button>
            <button onClick={handleDeleteClick}>DELETE</button>
          </>
        ) : (
          <></>
        )}
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

export default ShortDetailedRecipe;
