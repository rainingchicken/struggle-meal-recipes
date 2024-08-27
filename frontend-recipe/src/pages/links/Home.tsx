import { useEffect, useState } from "react";

import { useGetAllRecipesMutation } from "../../slices/recipeApiSlice";

import Recipe from "../../components/displays/ShortDetailedRecipe";
import IRecipeDetails from "../../interfaces/IRecipeDetails";

const Home = () => {
  const [recipes, setRecipes] = useState<null | Array<IRecipeDetails>>(null);
  const [error, setError] = useState<string | null>(null);
  const [getAllRecipesAPICall, { isLoading }] = useGetAllRecipesMutation();

  const fetchRecipes = async () => {
    try {
      const res = await getAllRecipesAPICall(null).unwrap();
      setRecipes(res);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot load recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
    document.title = "Home";
  }, []);

  const loaded = () => {
    return (
      <>
        {/* {console.log(recipes)} */}
        {recipes &&
          recipes.map((recipe: IRecipeDetails) => (
            <Recipe key={recipe._id} recipe={recipe} />
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
      <h1>Struggle Meal Recipes</h1>
      <>{isLoading ? loading() : loaded()}</>
    </div>
  );
};

export default Home;
