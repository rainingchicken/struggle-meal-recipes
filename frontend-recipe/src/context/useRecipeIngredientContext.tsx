import { useContext } from "react";
import { RecipeIngredientContext } from "./RecipeIngredientContext";

export const useRecipeIngredientContext = () => {
  const context = useContext(RecipeIngredientContext);
  if (!context) {
    throw Error(
      "useRecipeIngredientContext must be used inside an RecipeIngredientContextProvider"
    );
  }
  return context;
};
