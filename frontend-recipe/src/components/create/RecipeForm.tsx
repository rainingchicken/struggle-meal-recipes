import { useSelector } from "react-redux";
import { FormEvent, useState } from "react";
import { useCreatePersonalRecipeMutation } from "../../slices/personalRecipeSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecipeForm = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  const [recipe, setRecipe] = useState({
    title: "",
    categories: "",
    servings: 1,
    vegan: "notvegan",

    procedures: [],
    desperation: 0,
    health: 0,
  });
  // const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [createRecipeAPICall] = useCreatePersonalRecipeMutation();

  const handleChange = (e: FormEvent) => {
    const { name, type } = e.target as HTMLInputElement;
    if (type === "number" || type === "range") {
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

  const handleVeganClick = (e: FormEvent) => {
    // setRecipe({ ...recipe, vegan: !recipe.vegan });
    // console.log(recipe.vegan);
    const { id, value } = e.target as HTMLInputElement;
    if (id === "vegan") {
      const isVegan = value || "notvegan";
      setRecipe((state) => ({
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

      procedures: recipe.procedures,
      desperation: recipe.desperation,
      user: userInfo,
    };
    try {
      const res = await createRecipeAPICall(newRecipe).unwrap();
      setRecipe(res);
      navigate(`/create/${res._id}/ingredients-and-procedures`);
    } catch (error) {
      // setError("Something went wrong. Cannot submit");
      console.log(error);
      toast.dark("Something went wrong. Cannot create the recipe");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <form className="RecipeForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Recipe Name: </label>
        <input
          onChange={handleChange}
          type="text"
          id="title"
          placeholder="Recipe Name"
          name="title"
          required
        />

        {/* <label htmlFor="categories">Categories: </label>
        <input
          onChange={handleChange}
          type="text"
          id="categories"
          placeholder="American, Asian, Mix, Other..."
          name="categories"
          required
        /> */}

        <label htmlFor="categories">Category</label>
        <select
          name="categories"
          className="RecipeFormSelection"
          id="categories"
          onChange={handleChange}
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
          id="servings"
          name="servings"
          required
        />

        <label htmlFor="vegan">Vegan: </label>
        {/* <input
          onClick={handleVeganClick}
          type="checkbox"
          id="vegan"
          name="vegan"
        /> */}
        <select
          name="vegan"
          id="vegan"
          onChange={handleVeganClick}
          className="RecipeFormSelection"
        >
          <option value="notvegan">No</option>

          <option value="true">Yes</option>
        </select>

        {/* 
        <label htmlFor="desperation">Desperation Level: </label>
        <input
          onChange={handleChange}
          type="number"
          id="desperation"
          name="desperation"
          required
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
          defaultValue={0}
          onChange={handleChange}
        />

        <label htmlFor="health">Health Meter: {recipe.health}</label>
        <input
          onChange={handleChange}
          type="range"
          min="0"
          max="10"
          step="1"
          id="health"
          name="health"
          defaultValue={0}
          className="slider"
          required
        />
        <div>
          <button className="btnForm">NEXT</button>
        </div>
        {/* <p className="error">{error}</p> */}
      </form>

      <button className="btn" onClick={handleCancel}>
        CANCEL
      </button>
    </>
  );
};

export default RecipeForm;
