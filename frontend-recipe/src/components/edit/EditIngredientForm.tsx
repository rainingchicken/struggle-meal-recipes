import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdatePersonalRecipesIngredientMutation } from "../../slices/personalRecipeSlice";
import IIngredients from "../../interfaces/IIngredients";

interface IParams {
  recipe_id: string | undefined;
  ingredient: IIngredients;
  setEdit: Function;
}

const EditIngredientForm = ({ recipe_id, ingredient, setEdit }: IParams) => {
  // const { ingredients, setIngredients } = useContext(IngredientContext);
  const [thisIngredient, setThisIngredient] = useState({
    amount: ingredient.amount,
    unit: ingredient.unit,
    ingredient: ingredient.ingredient,
  });
  const [error, setError] = useState<string | null>(null);

  const [
    updateIngredientAPICall,
  ] = useUpdatePersonalRecipesIngredientMutation();

  const handleChange = (e: FormEvent) => {
    const { name, type } = e.target as HTMLInputElement;
    if (type === "number") {
      setThisIngredient((state) => ({
        ...state,
        [name]: +(e.target as HTMLInputElement).value,
      }));
    } else {
      setThisIngredient((state) => ({
        ...state,
        [name]: (e.target as HTMLInputElement).value,
      }));
    }
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    const newIngredient = {
      amount: thisIngredient.amount,
      unit: thisIngredient.unit,
      ingredient: thisIngredient.ingredient,
      recipe_id: recipe_id,
    };
    try {
      const res = await updateIngredientAPICall({
        _id: recipe_id,
        ingredient_id: ingredient._id,
        data: newIngredient,
      }).unwrap();
      setThisIngredient(res);
      setEdit(false);
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ingredientsForm">
      <label htmlFor="amount">Amount</label>
      <input
        onChange={handleChange}
        type="number"
        name="amount"
        value={thisIngredient.amount}
      />
      <label htmlFor="unit">Unit</label>
      <input
        onChange={handleChange}
        type="text"
        name="unit"
        value={thisIngredient.unit}
      />
      <label htmlFor="ingredient">Ingredient name</label>
      <input
        onChange={handleChange}
        type="text"
        name="ingredient"
        value={thisIngredient.ingredient}
      />
      <button>SAVE</button>
      <p className="error">{error}</p>
    </form>
  );
};

export default EditIngredientForm;
