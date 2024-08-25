import { useParams } from "react-router-dom";
import IngredientForm from "../components/create/IngredientForm";
import { useContext, useEffect, useState } from "react";
import { IngredientContext } from "../context/IngredientContext";
import { useGetAllPersonalRecipesIngredientsMutation } from "../slices/personalRecipeSlice";
import Ingredient from "../components/displays/Ingredient";

const EditIngredientForm = () => {
  const { _id } = useParams();
  const { ingredients, setIngredients } = useContext(IngredientContext);

  const [error, setError] = useState<string | null>(null);

  const [
    getAllRecipesAPICall,
    { isLoading },
  ] = useGetAllPersonalRecipesIngredientsMutation();

  const fetchRecipes = async () => {
    try {
      const res = await getAllRecipesAPICall(null).unwrap();
      setIngredients(res);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot get recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
    document.title = "Edit Ingredients";
  }, []);

  const loaded = () => {
    return (
      <>
        <Ingredient _id={ingredients._id} />
        <IngredientForm recipe_id={_id} />;<p className="error">{error}</p>
      </>
    );
  };
  return <>{isLoading ? <h1>Loading...</h1> : loaded()}</>;
};

export default EditIngredientForm;
