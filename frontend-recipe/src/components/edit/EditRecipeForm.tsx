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
      navigate(`/dashboard/edit/${recipe._id}/ingredients-and-procedures`);
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  const handleSaveandExit = async (e: FormEvent) => {
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
      navigate(`/dashboard`);
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };
  const handleCancel = () => {
    navigate(`/dashboard`);
  };
  return (
    <>
      {_id && recipe ? (
        <>
          <form className="RecipeForm" onSubmit={handleSubmit}>
            <label htmlFor="title">Recipe Name: </label>
            <input
              onChange={handleChange}
              type="text"
              name="title"
              id="title"
              value={recipe.title}
              required
            />
            {/* 
          <label htmlFor="categories">Categories: </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="categories"
            name="categories"
            value={recipe.categories}
            id="categories"
            required
          /> */}
            <label htmlFor="categories">Category</label>
            <select
              className="RecipeFormSelection"
              name="categories"
              id="categories"
              onChange={handleChange}
              value={recipe.categories}
            >
              <option value="uncategorized"></option>
              <option value="Mix">Mix</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Europe">Europe</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="servings">Serving Size: </label>
            <input
              onChange={handleChange}
              type="number"
              name="servings"
              value={recipe.servings}
              id="servings"
              required
            />

            <label htmlFor="vegan">Vegan: </label>
            <select
              className="RecipeFormSelection"
              name="vegan"
              id="vegan"
              onChange={handleVeganClick}
            >
              <option value="notvegan">No</option>

              <option value="true">Yes</option>
            </select>

            {/* <label className="form-label" htmlFor="desperation">
              Desperation Level:{" "}
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="desperation"
              value={recipe.desperation}
              id="desperation"
              required
              className="slider"
            />

            <label htmlFor="health">health Meter: </label>
            <input
              onChange={handleChange}
              type="number"
              name="health"
              value={recipe.health}
              id="health"
              required
              className="slider"
            /> */}
            <label htmlFor="desperation" className="form-label">
              Desperation Level: {recipe.desperation}
            </label>

            <input
              type="range"
              className="slider"
              min="0"
              max="10"
              step="1"
              id="desperation"
              name="desperation"
              value={recipe.desperation}
              onChange={handleChange}
            />

            <label htmlFor="health">health Meter: {recipe.health}</label>
            <input
              onChange={handleChange}
              type="range"
              min="0"
              max="10"
              step="1"
              id="health"
              name="health"
              value={recipe.health}
              className="slider"
              required
            />

            <button className="btnForm">SAVE and NEXT</button>

            <p className="error">{error}</p>
          </form>{" "}
          <button className="btn" onClick={handleSaveandExit}>
            SAVE and EXIT
          </button>
          <button className="btnForm" onClick={handleCancel}>
            CANCEL
          </button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default EditRecipeForm;
