import { useContext } from "react";
import { IngredientContext } from "./IngredientContext";

export const useIngredientContext = () => {
  const context = useContext(IngredientContext);
  if (!context) {
    throw Error(
      "useIngredientContext must be used inside an IngredientContextProvider"
    );
  }
  return context;
};
