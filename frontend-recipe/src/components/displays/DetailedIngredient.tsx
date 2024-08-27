import { FormEvent, useState } from "react";
import IIngredients from "../../interfaces/IIngredients";
import { useDeletePersonalRecipesIngredientMutation } from "../../slices/personalRecipeSlice";
import EditIngredientForm from "../edit/EditIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { setIngredients } from "../../slices/ingredientsSlice";

interface IParams {
  recipe_id: string | undefined;
  ingredient: IIngredients;
  user?: string | undefined;
}
const DetailedIngredient = ({ recipe_id, ingredient, user }: IParams) => {
  const { userInfo } = useSelector((state: any) => state.auth);
  //   const { ingredients, setIngredients } = useContext(IngredientContext);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector((state: any) => state.ingredients.state);

  const [
    deleteIngredientAPICall,
  ] = useDeletePersonalRecipesIngredientMutation();

  const handleDeleteIngredient = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await deleteIngredientAPICall({
        _id: recipe_id,
        ingredient_id: ingredient._id,
      }).unwrap();
      //re-setRecipes to show only ones that are not deleted

      const newIngredients = [...ingredients].filter((thisIngredient) => {
        return thisIngredient._id !== ingredient._id;
      });
      dispatch(setIngredients(newIngredients));

      // location.reload();
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
        {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
        {userInfo && userInfo._id === user ? (
          <>
            <button onClick={handleDeleteIngredient}>DELETE</button>
            <button onClick={handleEditIngredient}>EDIT</button>
          </>
        ) : (
          <></>
        )}
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
