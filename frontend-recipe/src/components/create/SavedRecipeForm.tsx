import { FormEvent, useEffect, useState } from "react";
import {
  useGetPersonalRecipeMutation,
  useUpdatePersonalRecipeMutation,
} from "../../slices/personalRecipeSlice";
import { useNavigate, useParams } from "react-router-dom";
import IRecipeDetails from "../../interfaces/IRecipeDetails";

const SavedRecipeForm = () => {
  const { _id } = useParams();
  const [recipe, setRecipe] = useState<Array<IRecipeDetails> | any>({
    title: "",
    categories: "",
    servings: 1,
    vegan: "notvegan",
    health: 0,
    desperation: 0,
  });

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

  const handleVeganClick = (e: FormEvent) => {
    // setRecipe({ ...recipe, vegan: !recipe.vegan });
    // console.log(recipe.vegan);
    const { id, value } = e.target as HTMLInputElement;
    if (id === "vegan") {
      const isVegan = value || "notvegan";
      setRecipe((state: IRecipeDetails) => ({
        ...state,
        [id]: isVegan,
      }));
    }
  };

  //the next button
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newRecipe = {
      title: recipe.title,
      categories: recipe.categories,
      servings: recipe.servings,
      vegan: recipe.vegan,
      health: recipe.health,
      desperation: recipe.desperation,
    };
    try {
      const res = await updateRecipeAPICall({
        id: _id,
        data: newRecipe,
      }).unwrap();
      setRecipe(res);
      navigate(`/create/${recipe._id}/ingredients-and-procedures`);
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  return (
    <>
      {_id && recipe ? (
        <form className="updateRecipeForm" onSubmit={handleSubmit}>
          <label htmlFor="title">Recipe Name: </label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
            value={recipe.title}
            required
          />

          <label htmlFor="categories">Categories: </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="categories"
            name="categories"
            value={recipe.categories}
            id="categories"
            required
          />

          <label htmlFor="servings">Serving Size: </label>
          <input
            onChange={handleChange}
            type="number"
            name="servings"
            value={recipe.servings}
            id="servings"
            required
          />

          {/* <label htmlFor="vegan">Vegan: </label>
          <input
            onClick={handleVeganClick}
            type="checkbox"
            name="vegan"
            id="vegan"
          /> */}
          <label htmlFor="vegan">Vegan: </label>
          <select name="vegan" id="vegan" onChange={handleVeganClick}>
            <option value="notvegan">No</option>

            <option value="true">Yes</option>
          </select>

          <label htmlFor="desperation">Desperation Level: </label>
          <input
            onChange={handleChange}
            type="number"
            name="desperation"
            value={recipe.desperation}
            id="desperation"
            required
          />

          <label htmlFor="health">health Meter: </label>
          <input
            onChange={handleChange}
            type="number"
            name="health"
            value={recipe.health}
            id="health"
            required
          />

          <button>NEXT</button>
          <p className="error">{error}</p>
        </form>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default SavedRecipeForm;
