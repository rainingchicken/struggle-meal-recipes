import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { RecipeContext } from "./context/RecipeContext";

const App = () => {
  const [recipes, setRecipes] = useState(null);

  return (
    <>
      <RecipeContext.Provider value={{ recipes, setRecipes }}>
        <Navbar />
        <Outlet />
        <Footer />
      </RecipeContext.Provider>
    </>
  );
};

export default App;
