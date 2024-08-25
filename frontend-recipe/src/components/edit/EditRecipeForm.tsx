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
      navigate(`/dashboard/edit/${recipe._id}/ingredients`);
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  return (
    <form className="updateRecipeForm" onSubmit={handleSubmit}>
      <label htmlFor="title">Recipe Name: </label>
      <input
        onChange={handleChange}
        type="text"
        name="title"
        id="title"
        value={recipe.title}
      />

      <label htmlFor="categories">Categories: </label>
      <input
        onChange={handleChange}
        type="text"
        placeholder="categories"
        name="categories"
        value={recipe.categories}
        id="categories"
      />

      <label htmlFor="servings">Serving Size: </label>
      <input
        onChange={handleChange}
        type="number"
        name="servings"
        value={recipe.servings}
        id="servings"
      />

      <label htmlFor="vegan">Vegan: </label>
      <input
        onChange={handleChange}
        type="checkbox"
        name="vegan"
        checked={recipe.vegan}
        id="vegan"
      />

      <label htmlFor="desperation">Desperation Level: </label>
      <input
        onChange={handleChange}
        type="number"
        name="desperation"
        value={recipe.desperation}
        id="desperation"
      />

      <label htmlFor="health">health Meter: </label>
      <input
        onChange={handleChange}
        type="number"
        name="health"
        value={recipe.health}
        id="health"
      />

      <button>NEXT</button>
      <p className="error">{error}</p>
    </form>
  );
};

export default EditRecipeForm;
