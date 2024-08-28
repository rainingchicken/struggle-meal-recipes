import { useEffect, useState } from "react";

import { useGetAllRecipesMutation } from "../../slices/recipeApiSlice";

// import ShortDetailedRecipe from "../../components/displays/ShortDetailedRecipe";
import IRecipeDetails from "../../interfaces/IRecipeDetails";
import PublicShortDetailedRecipe from "../../components/displays/PublicShortDetailedRecipe";

const Home = () => {
  const [recipes, setRecipes] = useState<Array<IRecipeDetails>>([]);
  const [showMore, setShowMore] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [getAllRecipesAPICall, { isLoading }] = useGetAllRecipesMutation();

  const fetchRecipes = async () => {
    try {
      const res = await getAllRecipesAPICall(null).unwrap();
      if (res.length < 5) {
        setShowMore(false);
      }
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

  const handleShowMore = async () => {
    const startIndex = recipes.length;
    try {
      const res = await getAllRecipesAPICall(
        `startIndex=${startIndex}`
      ).unwrap();

      setRecipes((state) => [...state, ...res]);

      if (res.length < 5) {
        setShowMore(false);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot load recipes");
    }
  };
  const loaded = () => {
    return (
      <>
        {/* {console.log(recipes)} */}
        {recipes &&
          recipes.map((recipe: IRecipeDetails) => (
            <PublicShortDetailedRecipe key={recipe._id} recipe={recipe} />
          ))}
        {showMore && <button onClick={handleShowMore}>SHOW MORE</button>}
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
