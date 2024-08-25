import { useState } from "react";
import IIngredients from "../../interfaces/IIngredients";
import { useDeletePersonalRecipesIngredientMutation } from "../../slices/personalRecipeSlice";

import IngredientForm from "../create/IngredientForm";
import EditIngredientForm from "../edit/EditIngredientForm";

interface IParams {
  recipe_id: string | undefined;
  ingredient: IIngredients;
}
const DetailedIngredient = ({ recipe_id, ingredient }: IParams) => {
  //   const { ingredients, setIngredients } = useContext(IngredientContext);
  const [edit, setEdit] = useState(false);

  const amount = ingredient.amount;
  const unit = ingredient.unit;
  const ingredientName = ingredient.ingredient;

  const [
    deleteIngredientAPICall,
  ] = useDeletePersonalRecipesIngredientMutation();

  const handleDeleteIngredient = async () => {
    try {
      await deleteIngredientAPICall({
        _id: recipe_id,
        ingredient_id: ingredient._id,
      }).unwrap();
      //re-setRecipes to show only ones that are not deleted
      //   console.log(ingredients);
      //   const newIngredients = [...ingredients].filter((thisIngredient) => {
      //     return thisIngredient._id !== ingredients._id;
      //   });
      //   setIngredients(newIngredients);

      location.reload();
      console.log("deleted ingredient");
    } catch (error) {
      console.log({ error });
    }
  };

  const handleEditIngredient = () => {
    setEdit(!edit);
  };

  const displayMode = () => {
    return (
      <>
        {amount} {unit} {ingredientName}
        <button onClick={handleDeleteIngredient}>DELETE</button>
        <button onClick={handleEditIngredient}>EDIT</button>
      </>
    );
  };

  const editMode = () => {
    return (
      <EditIngredientForm
        recipe_id={recipe_id}
        ingredient={ingredient}
        setEdit={setEdit}
      />
    );
  };

  return <>{edit ? editMode() : displayMode()}</>;
};

export default DetailedIngredient;
