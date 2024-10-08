import IIngredients from "./IIngredients";

interface IRecipeDetails {
  _id: string;
  title: string;
  categories: string;
  servings: number;
  vegan: string;
  ingredients: Array<IIngredients>;
  procedures: Array<String>;
  desperation: number;
  health: number;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export default IRecipeDetails;
