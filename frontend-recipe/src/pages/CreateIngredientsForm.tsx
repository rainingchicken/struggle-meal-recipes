import { useParams } from "react-router-dom";
import IngredientForm from "../components/ingredientComponents/IngredientForm";
import Ingredient from "../components/ingredientComponents/Ingredient";

const CreateIngredientsForm = () => {
  const { _id } = useParams();
  return (
    <div>
      <Ingredient _id={_id} />
      <IngredientForm recipe_id={_id} />
    </div>
  );
};

export default CreateIngredientsForm;
