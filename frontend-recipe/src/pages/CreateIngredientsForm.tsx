import { useParams } from "react-router-dom";
import IngredientForm from "../components/create/IngredientForm";
// import Ingredient from "../components/ingredientComponents/Ingredient";
import RecipeIngredient from "../components/displays/RecipeIngredient";
const CreateIngredientsForm = () => {
  const { _id } = useParams();
  return (
    <div>
      {/* <Ingredient _id={_id} /> */}
      <RecipeIngredient _id={_id} />
      <IngredientForm recipe_id={_id} />
    </div>
  );
};

export default CreateIngredientsForm;
