import IRecipeDetails from "../interfaces/IRecipeDetails";

interface IParams {
  recipe: IRecipeDetails;
}

const ShortDetailedRecipe = ({ recipe }: IParams) => {
  const title = recipe.title;
  const categories = recipe.categories;
  const servings = recipe.servings;
  const author = recipe.user;
  const vegan = recipe.vegan;
  const desperation = recipe.desperation;
  const health = recipe.health;
  return (
    <div>
      <h1>{title}</h1>
      <p>Categories: {categories}</p>
      <p>Servings: {servings}</p>
      <p>Vegan: {vegan ? "Yes" : "No"}</p>
      <p>Desperation Level: {desperation}</p>
      <p>Healthy Meter: {health}</p>
      <p>Author: {author}</p>
    </div>
  );
};

export default ShortDetailedRecipe;
