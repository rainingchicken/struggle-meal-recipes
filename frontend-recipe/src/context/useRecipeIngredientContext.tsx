import { useContext } from "react";
import { RecipeIngredientContext } from "./RecipeIngredientContext.tsx";

export const useRecipeIngredientContext = () => {
  const context = useContext(RecipeIngredientContext);
  if (!context) {
    throw Error(
      "useRecipeIngredientContext must be used inside an RecipeIngredientContextProvider"
    );
  }
  return context;
};
