import { useParams } from "react-router-dom";
import IngredientForm from "../components/create/IngredientForm";
import Ingredient from "../components/displays/Ingredient";
// import RecipeIngredient from "../components/displays/RecipeIngredient";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CreateIngredientsForm = () => {
  useEffect(() => {
    document.title = "Create Ingredients";
  }, []);
  const { _id } = useParams();
  const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <div>
      <h1>Ingredients</h1>
      <Ingredient user={userInfo._id} _id={_id} />
      {/* <RecipeIngredient _id={_id} /> */}
      <IngredientForm recipe_id={_id} />
    </div>
  );
};

export default CreateIngredientsForm;
