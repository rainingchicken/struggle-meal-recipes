import { useParams } from "react-router-dom";
import IngredientForm from "../components/create/IngredientForm";
// import Ingredient from "../components/ingredientComponents/Ingredient";
import RecipeIngredient from "../components/displays/RecipeIngredient";
import { useEffect } from "react";

const CreateIngredientsForm = () => {
  useEffect(() => {
    document.title = "Create Ingredients";
  }, []);
  const { _id } = useParams();

  return (
    <div>
      {/* <Ingredient _id={_id} /> */}
      <RecipeIngredient _id={_id} />
      <IngredientForm recipe_id={_id} userAction="create" />
    </div>
  );
};

export default CreateIngredientsForm;
