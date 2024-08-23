import IngredientForm from "./ingredientForm";
import ProcedureForm from "./ProcedureForm";

const RecipeForm = () => {
  return (
    <form id="createRecipeForm">
      <label htmlFor="title">Recipe Name: </label>
      <input type="text" id="title" placeholder="Recipe Name" />
      <label htmlFor="servings">Serving Size: </label>
      <input type="text" id="servings" />
      <label htmlFor="vegan">Vegan: </label>
      <input type="checkbox" id="vegan" />
      <label htmlFor="desperation">Desperation Level: </label>
      <input type="text" id="desperation" />
      <label htmlFor="health">Healthy Meter: </label>
      <input type="text" id="health" />
      <IngredientForm />
      <ProcedureForm />
    </form>
  );
};

export default RecipeForm;
