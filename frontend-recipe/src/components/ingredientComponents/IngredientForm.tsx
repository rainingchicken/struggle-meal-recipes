import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePersonalRecipesIngredientMutation } from "../../slices/personalRecipeSlice";
import Ingredient from "./Ingredient";
// import { IngredientContext } from "../../context/IngredientContext";
// import IIngredients from "../../interfaces/IIngredients";
// import Ingredient from "./Ingredient";

interface IParams {
  recipe_id: string | undefined;
}

const IngredientForm = ({ recipe_id }: IParams) => {
  const [ingredient, setIngredient] = useState({
    amount: 0,
    unit: "",
    ingredient: "",
  });
  // const { ingredients, setIngredients } = useContext(IngredientContext);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [
    createIngredientAPICall,
  ] = useCreatePersonalRecipesIngredientMutation();

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      setIngredient(res);
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  const handleBackButton = () => {
    navigate(`/dashboard/edit/${recipe_id}`);
  };

  const handleNextButton = () => {
    navigate(`/dashboard/edit/${recipe_id}/procedures`);
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
    </>
  );
};

export default IngredientForm;
