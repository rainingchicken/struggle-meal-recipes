import { FormEvent, useState } from "react";
import { useUpdatePersonalRecipesIngredientMutation } from "../../slices/personalRecipeSlice";
import IIngredients from "../../interfaces/IIngredients";
import { useDispatch, useSelector } from "react-redux";
import { setIngredients } from "../../slices/ingredientsSlice";
import { toast } from "react-toastify";

interface IParams {
  recipe_id: string | undefined;
  ingredient: IIngredients;
  setEdit: Function;
}

const EditIngredientForm = ({ recipe_id, ingredient, setEdit }: IParams) => {
  // const { ingredients, setIngredients } = useContext(IngredientContext);

  const dispatch = useDispatch();
  const ingredients = useSelector((state: any) => state.ingredients.state);

  const [thisIngredient, setThisIngredient] = useState({
    amount: ingredient.amount,
    unit: ingredient.unit,
    ingredient: ingredient.ingredient,
  });
  // const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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

      const updatedIngredients = [...ingredients].map((thisIngredient) => {
        return thisIngredient._id === ingredient._id ? res : thisIngredient;
      });
      // console.log(updatedIngredients);
      // dispatch(setIngredients(updatedIngredients));
      dispatch(setIngredients(updatedIngredients));
      setEdit(false);
    } catch (error) {
      // setError("Something went wrong. Cannot submit");
      toast.dark("Something went wrong. Cannot update the ingredients");
      console.log(error);
    }
  };

  return (
    <div className="ingredientsFormDiv">
      <form onSubmit={handleSubmit} className="ingredientsForm">
        <span>
          <label htmlFor="amount">Amount</label>
          <input
            className="ingredientsFormAmountInput"
            onChange={handleChange}
            type="number"
            name="amount"
            step="0.01"
            value={thisIngredient.amount}
          />
        </span>
        <span>
          <label htmlFor="unit">Unit</label>
          <input
            className="ingredientsFormUnitInput"
            onChange={handleChange}
            type="text"
            name="unit"
            value={thisIngredient.unit}
          />
        </span>
        <span>
          <label htmlFor="ingredient">Ingredient name</label>
          <input
            className="ingredientsFormIngredientInput"
            onChange={handleChange}
            type="text"
            name="ingredient"
            value={thisIngredient.ingredient}
          />
        </span>
        <button className="inline-btn">SAVE</button>
        {/* <p className="error">{error}</p> */}
      </form>
    </div>
  );
};

export default EditIngredientForm;
