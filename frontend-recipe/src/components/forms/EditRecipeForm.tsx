import { FormEvent, useEffect, useState } from "react";
import {
  useGetPersonalRecipeMutation,
  useUpdatePersonalRecipeMutation,
} from "../../slices/personalRecipeSlice";
import { useNavigate } from "react-router-dom";
import IRecipeDetails from "../../interfaces/IRecipeDetails";

interface IParams {
  _id: string | any;
}

const EditRecipeForm = ({ _id }: IParams) => {
  const [recipe, setRecipe] = useState<Array<IRecipeDetails> | any>([]);
  const [error, setError] = useState<string | null>(null);

  const [getRecipeAPICall] = useGetPersonalRecipeMutation();

  const fetchRecipe = async () => {
    try {
      const res = await getRecipeAPICall(_id).unwrap();
      setRecipe(res);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot set error");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const navigate = useNavigate();

  const [updateRecipeAPICall] = useUpdatePersonalRecipeMutation();

  const handleChange = (e: FormEvent) => {
    const { name, type } = e.target as HTMLInputElement;
    if (type === "number") {
      setRecipe((state: IRecipeDetails) => ({
        ...state,
        [name]: +(e.target as HTMLInputElement).value,
      }));
    } else {
      setRecipe((state: IRecipeDetails) => ({
        ...state,
        [name]: (e.target as HTMLInputElement).value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newRecipe = {
      title: recipe.title,
      categories: recipe.categories,
      servings: recipe.servings,
      vegan: recipe.vegan,
      health: recipe.health,
      ingredients: recipe.ingredients,
      procedures: recipe.procedures,
      desperation: recipe.desperation,
    };
    try {
      const res = await updateRecipeAPICall({
        id: _id,
        data: newRecipe,
      }).unwrap();
      setRecipe(res);
      navigate("/dashboard");
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  return (
    <form id="updateRecipeForm" onSubmit={handleSubmit}>
      <label htmlFor="title">Recipe Name: </label>
      <input
        onChange={handleChange}
        type="text"
        id="title"
        name="title"
        value={recipe.title}
      />

      <label htmlFor="categories">Categories: </label>
      <input
        onChange={handleChange}
        type="text"
        id="categories"
        placeholder="categories"
        name="categories"
        value={recipe.categories}
      />

      <label htmlFor="servings">Serving Size: </label>
      <input
        onChange={handleChange}
        type="number"
        id="servings"
        name="servings"
        value={recipe.servings}
      />

      <label htmlFor="vegan">Vegan: </label>
      <input
        onChange={handleChange}
        type="checkbox"
        id="vegan"
        name="vegan"
        checked={recipe.vegan}
      />

      <label htmlFor="desperation">Desperation Level: </label>
      <input
        onChange={handleChange}
        type="number"
        id="desperation"
        name="desperation"
        value={recipe.desperation}
      />

      <label htmlFor="health">health Meter: </label>
      <input
        onChange={handleChange}
        type="number"
        id="health"
        name="health"
        value={recipe.health}
      />

      <label htmlFor="amount">Amount</label>
      <input
        onChange={handleChange}
        type="number"
        id="amount"
        // value={recipe.ingredients.amount}
      />
      <label htmlFor="unit">Unit</label>
      <input
        onChange={handleChange}
        type="string"
        id="unit"
        // value={recipe.ingredients.unit}
      />
      <label htmlFor="ingredient">Ingredient name</label>
      <input
        onChange={handleChange}
        type="text"
        id="ingredient"
        // value={recipe.ingredients.ingredient}
      />

      <label htmlFor="procedures">Procedures</label>
      <textarea
        onChange={handleChange}
        name="procedures"
        id="procedures"
        // value={recipe.procedures}
      ></textarea>

      <button>UPDATE</button>
      <p className="error">{error}</p>
    </form>
  );
};

export default EditRecipeForm;
