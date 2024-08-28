import { useEffect, useState } from "react";
import { useGetAllRecipesMutation } from "../slices/recipeApiSlice";
import IRecipeDetails from "../interfaces/IRecipeDetails";

import ShortDetailedRecipe from "../components/displays/ShortDetailedRecipe";

const Search = () => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Array<IRecipeDetails>>([]);
  const [showMore, setShowMore] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [getAllRecipesAPICall, { isLoading }] = useGetAllRecipesMutation();

  const fetchRecipes = async (searchQuery: string | null) => {
    try {
      const res = await getAllRecipesAPICall(searchQuery).unwrap();
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
    const urlParams = new URLSearchParams(location.search);
    // const searchTermFromURL = urlParams.get("searchTerm");
    const searchQuery = urlParams.toString();
    // if (searchTermFromURL) {
    //   setSearchTerm(searchTermFromURL);
    // }
    fetchRecipes(searchQuery);
    document.title = "Search";
  }, [location.search]);

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
            <ShortDetailedRecipe key={recipe._id} recipe={recipe} />
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
      <h1>Search Results</h1>
      <>{isLoading ? loading() : loaded()}</>
    </div>
  );
};

export default Search;
