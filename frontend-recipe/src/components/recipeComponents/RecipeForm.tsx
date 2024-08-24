import { useSelector } from "react-redux";
import { FormEvent, useState } from "react";
import { useCreatePersonalRecipeMutation } from "../../slices/personalRecipeSlice";
import { Link, useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  const [recipe, setRecipe] = useState({
    title: "",
    categories: [],
    servings: 1,
    vegan: false,

    procedures: [],
    desperation: 0,
    health: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [createRecipeAPICall] = useCreatePersonalRecipeMutation();

  const handleChange = (e: FormEvent) => {
    const { name, type } = e.target as HTMLInputElement;
    if (type === "number") {
      setRecipe((state) => ({
        ...state,
        [name]: +(e.target as HTMLInputElement).value,
      }));
    } else {
      setRecipe((state) => ({
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

      procedures: recipe.procedures,
      desperation: recipe.desperation,
      user: userInfo,
    };
    try {
      const res = await createRecipeAPICall(newRecipe).unwrap();
      setRecipe(res);
      navigate(`/create/${res._id}/ingredients`);
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  return (
    <form id="createRecipeForm" onSubmit={handleSubmit}>
      <label htmlFor="title">Recipe Name: </label>
      <input
        onChange={handleChange}
        type="text"
        id="title"
        placeholder="Recipe Name"
        name="title"
      />

      <label htmlFor="categories">Categories: </label>
      <input
        onChange={handleChange}
        type="text"
        id="categories"
        placeholder="American, Asian, Mix, Other..."
        name="categories"
      />

      <label htmlFor="servings">Serving Size: </label>
      <input
        onChange={handleChange}
        type="number"
        id="servings"
        name="servings"
      />

      <label htmlFor="vegan">Vegan: </label>
      <input onChange={handleChange} type="checkbox" id="vegan" name="vegan" />

      <label htmlFor="desperation">Desperation Level: </label>
      <input
        onChange={handleChange}
        type="number"
        id="desperation"
        name="desperation"
      />

      <label htmlFor="health">health Meter: </label>
      <input onChange={handleChange} type="number" id="health" name="health" />

      <button>NEXT</button>
      <p className="error">{error}</p>
    </form>
  );
};

export default RecipeForm;
