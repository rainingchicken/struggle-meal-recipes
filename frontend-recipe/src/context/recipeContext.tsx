import { createContext } from "react";
import IRecipeDetails from "../interfaces/IRecipeDetails";

interface IRecipeContext {
  recipes: IRecipeDetails | null | any;
  setRecipes: Function;
}

export const RecipeContext = createContext<IRecipeContext>(
  {} as IRecipeContext
);
