import { useParams } from "react-router-dom";
import IngredientForm from "../components/create/IngredientForm";
import { useEffect } from "react";

import RecipeIngredient from "../components/displays/RecipeIngredient";

const EditIngredientForm = () => {
  const { _id } = useParams();

  useEffect(() => {
    document.title = "Edit Ingredients";
  }, []);

  return (
    <>
      <RecipeIngredient _id={_id} />
      <IngredientForm recipe_id={_id} userAction="edit" />;
    </>
  );
};

export default EditIngredientForm;
