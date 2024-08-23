import { useEffect, useState } from "react";

import { useGetAllPersonalRecipesMutation } from "../slices/personalRecipeSlice.tsx";

import ShortDetailedRecipe from "../components/ShortDetailedRecipe.tsx";
import IRecipeDetails from "../interfaces/IRecipeDetails.tsx";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [recipes, setRecipes] = useState<null | Array<IRecipeDetails>>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [
    getAllRecipesAPICall,
    { isLoading },
  ] = useGetAllPersonalRecipesMutation();

  const fetchRecipes = async () => {
    try {
      const res = await getAllRecipesAPICall(null).unwrap();
      setRecipes(res);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot set error");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleCreateRecipe = () => {
    navigate("/create");
  };

  const loaded = () => {
    return (
      <>
        {recipes &&
          recipes.map((recipe) => (
            <div key={`div${recipe._id}`}>
              <ShortDetailedRecipe key={recipe._id} recipe={recipe} />{" "}
              <Link key={`link${recipe._id}`} to={`recipes/${recipe._id}`}>
                View
              </Link>
            </div>
          ))}
        <p className="error">{error}</p>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleCreateRecipe}>Create new recipe</button>
      <>{isLoading ? loading() : loaded()}</>
    </div>
  );
};

export default Dashboard;
