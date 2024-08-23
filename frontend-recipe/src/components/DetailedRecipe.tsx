import { useEffect, useState } from "react";
import IIngredients from "../interfaces/IIngredients";
import IRecipeDetails from "../interfaces/IRecipeDetails";
import {
  useDeletePersonalRecipeMutation,
  useGetPersonalRecipeMutation,
} from "../slices/personalRecipeSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

interface IParams {
  _id: string | any;
}

const DetailedRecipe = ({ _id }: IParams) => {
  const { userInfo } = useSelector((state: any) => state.auth);

  const [recipe, setRecipe] = useState<Array<IRecipeDetails> | any>([]);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [getRecipeAPICall, { isLoading }] = useGetPersonalRecipeMutation();
  const [deleteRecipeAPICall] = useDeletePersonalRecipeMutation();

  const fetchRecipe = async () => {
    try {
      const res = await getRecipeAPICall(_id).unwrap();
      setRecipe(res);
      // console.log(res);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot set error");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleDeleteClick = async () => {
    try {
      await deleteRecipeAPICall(recipe._id).unwrap();
      console.log("deleted");

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
      {!isLoading ? (
        <div className="recipeContainer">
          {userInfo &&
          location.pathname == `/dashboard/recipes/${recipe._id}` ? (
            <>
              <button onClick={handleEditClick}>EDIT</button>
              <button onClick={handleDeleteClick}>DELETE</button>
            </>
          ) : (
            <></>
          )}
          <h1>{recipe.title}</h1>
          <p>Categories: {recipe.categories}</p>
          <p>Servings: {recipe.servings}</p>
          <p>Vegan: {recipe.vegan ? "Yes" : "No"}</p>
          <p>Desperation Level: {recipe.desperation}</p>
          <p>Healthy Meter: {recipe.health}</p>
          <p>Author: {recipe.author}</p>
          <p>
            Ingredients:
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient: IIngredients) => (
                <li key={ingredient._id}>
                  {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
                </li>
              ))}
          </p>
          <div>
            Procedures:
            <ul>
              {recipe.procedures &&
                recipe.procedures.map((procedure: string, index: number) => (
                  <li key={index}>{procedure}</li>
                ))}
            </ul>
          </div>
          <p className="error">{error}</p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default DetailedRecipe;
