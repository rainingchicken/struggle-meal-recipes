import { createContext } from "react";
import IIngredients from "../interfaces/IIngredients";

interface IRecipeIngredientContext {
  ingredient: IIngredients | null | any;
  setIngredient: Function;
}

export const RecipeIngredientContext = createContext<IRecipeIngredientContext>(
  {} as IRecipeIngredientContext
);
