import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { RecipeContext } from "./context/RecipeContext";
import { IngredientContext } from "./context/IngredientContext";
import { RecipeIngredientContext } from "./context/RecipeIngredientContext";
const App = () => {
  const [recipes, setRecipes] = useState(null);
  const [ingredients, setIngredients] = useState(); //all ingredients
  const [ingredient, setIngredient] = useState(null); //ingredients for specific recipes
  return (
    <>
      <RecipeContext.Provider value={{ recipes, setRecipes }}>
        <IngredientContext.Provider value={{ ingredients, setIngredients }}>
          <RecipeIngredientContext.Provider
            value={{ ingredient, setIngredient }}
          >
            <Navbar />
            <Outlet />
            <Footer />
          </RecipeIngredientContext.Provider>
        </IngredientContext.Provider>
      </RecipeContext.Provider>
    </>
  );
};

export default App;
