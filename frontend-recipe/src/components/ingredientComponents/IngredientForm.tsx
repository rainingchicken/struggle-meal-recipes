import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePersonalRecipesIngredientMutation } from "../../slices/personalRecipeSlice";
import { IngredientContext } from "../../context/IngredientContext";
import IIngredients from "../../interfaces/IIngredients";

interface IParams {
  recipe_id: string;
}

const IngredientForm = ({ recipe_id }: IParams) => {
  const [ingredients, setIngredients] = useState({
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
      setIngredients((state) => ({
        ...state,
        [name]: +(e.target as HTMLInputElement).value,
      }));
    } else {
      setIngredients((state) => ({
        ...state,
        [name]: (e.target as HTMLInputElement).value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newIngredient = {
      amount: ingredients.amount,
      unit: ingredients.unit,
      ingredient: ingredients.ingredient,
      recipe_id: recipe_id,
    };
    try {
      const res = await createIngredientAPICall({
        _id: recipe_id,
        data: newIngredient,
      }).unwrap();
      setIngredients(res);
      navigate(`/dashboard/recipes/${recipe_id}`);
    } catch (error) {
      setError("Something went wrong. Cannot submit");
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
    </>
  );
};

export default IngredientForm;
