// import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
// import { RecipeContext } from "./context/RecipeContext.tsx";
// import { IngredientContext } from "./context/IngredientContext.tsx";
// import { ProceduresContext } from "./context/ProceduresContext.tsx";
// import { RecipeIngredientContext } from "./context/RecipeIngredientContext.tsx";
// import { TheseProceduresContext } from "./context/TheseProceduresContext.tsx";

const App = () => {
  // const [recipes, setRecipes] = useState(null);
  // const [ingredients, setIngredients] = useState();
  // const [ingredient, setIngredient] = useState();
  // const [procedures, setProcedures] = useState(null);
  // const [theseProcedures, setTheseProcedures] = useState(null);

  return (
    <>
      {/* <RecipeContext.Provider value={{ recipes, setRecipes }}>
        <RecipeIngredientContext.Provider value={{ ingredient, setIngredient }}>
          <IngredientContext.Provider value={{ ingredients, setIngredients }}>
            <ProceduresContext.Provider value={{ procedures, setProcedures }}>
              <TheseProceduresContext.Provider
                value={{ theseProcedures, setTheseProcedures }}
              > */}
      <Navbar />
      <Outlet />
      <Footer />
      {/* </TheseProceduresContext.Provider>
            </ProceduresContext.Provider>
          </IngredientContext.Provider>
        </RecipeIngredientContext.Provider>
      </RecipeContext.Provider> */}
    </>
  );
};

export default App;
