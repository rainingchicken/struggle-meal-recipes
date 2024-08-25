import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreatePersonalRecipesIngredientMutation,
  useDeletePersonalRecipeMutation,
} from "../../slices/personalRecipeSlice";
// import { RecipeIngredientContext } from "../../context/RecipeIngredientContext";
// import IIngredients from "../../interfaces/IIngredients";
// import { IngredientContext } from "../../context/IngredientContext";

interface IParams {
  recipe_id: string | undefined;
}

const IngredientForm = ({ recipe_id }: IParams) => {
  // const { ingredients, setIngredients } = useContext(IngredientContext);
  const [ingredient, setIngredient] = useState({
    amount: 0,
    unit: "",
    ingredient: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [
    createIngredientAPICall,
  ] = useCreatePersonalRecipesIngredientMutation();
  const [deleteRecipeAPICall] = useDeletePersonalRecipeMutation();

  const handleChange = (e: FormEvent) => {
    const { name, type } = e.target as HTMLInputElement;
    if (type === "number") {
      setIngredient((state) => ({
        ...state,
        [name]: +(e.target as HTMLInputElement).value,
      }));
    } else {
      setIngredient((state) => ({
        ...state,
        [name]: (e.target as HTMLInputElement).value,
      }));
    }
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    const newIngredient = {
      amount: ingredient.amount,
      unit: ingredient.unit,
      ingredient: ingredient.ingredient,
      recipe_id: recipe_id,
    };
    try {
      const res = await createIngredientAPICall({
        _id: recipe_id,
        data: newIngredient,
      }).unwrap();
      // setIngredients(res);
      setIngredient(res);
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  const handleBackButton = () => {
    navigate(`/create/${recipe_id}`);
  };

  const handleNextButton = () => {
    navigate(`/create/${recipe_id}/procedures`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteRecipeAPICall(recipe_id).unwrap();
      console.log("deleted");
      navigate("/dashboard");
    } catch (error) {
      setError("Cant delete");
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="ingredientsForm">
        <label htmlFor="amount">Amount</label>
        <input onChange={handleChange} type="number" name="amount" />
        <label htmlFor="unit">Unit</label>
        <input onChange={handleChange} type="text" name="unit" />
        <label htmlFor="ingredient">Ingredient name</label>
        <input onChange={handleChange} type="text" name="ingredient" />
        <button>ADD</button>
        <p className="error">{error}</p>
      </form>
      <button onClick={handleBackButton}>BACK</button>
      <button onClick={handleNextButton}>NEXT</button>
      <button onClick={handleDeleteClick}>CANCEL</button>
    </>
  );
};

export default IngredientForm;
