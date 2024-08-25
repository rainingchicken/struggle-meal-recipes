import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { RecipeContext } from "./context/RecipeContext";
import { IngredientContext } from "./context/IngredientContext";
import { ProceduresContext } from "./context/ProceduresContext";

const App = () => {
  const [recipes, setRecipes] = useState(null);
  const [ingredients, setIngredients] = useState();
  const [procedures, setProcedures] = useState(null);
  return (
    <>
      <RecipeContext.Provider value={{ recipes, setRecipes }}>
        <IngredientContext.Provider value={{ ingredients, setIngredients }}>
          <ProceduresContext.Provider value={{ procedures, setProcedures }}>
            <Navbar />
            <Outlet />
            <Footer />
          </ProceduresContext.Provider>
        </IngredientContext.Provider>
      </RecipeContext.Provider>
    </>
  );
};

export default App;
