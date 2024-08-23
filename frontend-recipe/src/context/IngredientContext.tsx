import { createContext } from "react";
import IIngredients from "../interfaces/IIngredients";

interface IIngredientContext {
  ingredients: IIngredients | null | any;
  setIngredients: Function;
}

export const IngredientContext = createContext<IIngredientContext>(
  {} as IIngredientContext
);
