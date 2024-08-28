import { useParams } from "react-router-dom";
import IngredientForm from "../components/create/IngredientForm";
import { useEffect } from "react";

import Ingredient from "../components/displays/Ingredient";
import { useSelector } from "react-redux";

const EditIngredientForm = () => {
  const { _id } = useParams();

  useEffect(() => {
    document.title = "Edit Ingredients";
  }, []);
  const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <>
      <h1>Ingredients</h1>
      <Ingredient user={userInfo._id} _id={_id} />
      <IngredientForm recipe_id={_id} />;
    </>
  );
};

export default EditIngredientForm;
