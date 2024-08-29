import { useEffect, useState } from "react";

import { useGetAllRecipesMutation } from "../../slices/recipeApiSlice";

// import ShortDetailedRecipe from "../../components/displays/ShortDetailedRecipe";
import IRecipeDetails from "../../interfaces/IRecipeDetails";
import PublicShortDetailedRecipe from "../../components/displays/PublicShortDetailedRecipe";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [recipes, setRecipes] = useState<Array<IRecipeDetails>>([]);
  const [showMore, setShowMore] = useState(true);

  // const [error, setError] = useState<string | null>(null);
  const [getAllRecipesAPICall, { isLoading }] = useGetAllRecipesMutation();

  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const res = await getAllRecipesAPICall(null).unwrap();
      if (res.length < 5) {
        setShowMore(false);
      }
      setRecipes(res);
    } catch (err) {
      console.log(err);
      // setError("Something went wrong. Cannot load recipes");
      toast.dark("Something went wrong. Cannot get the recipes");
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
      // setError("Something went wrong. Cannot load recipes");
      toast.dark("Something went wrong. Cannot get the recipes");
    }
  };
  const handlesignup = () => {
    navigate("/signup");
  };
  const loaded = () => {
    return (
      <>
        <div className="recipeParentParentContainer">
          <div className="recipeParentContainer">
            {/* {console.log(recipes)} */}
            {recipes &&
              recipes.map((recipe: IRecipeDetails) => (
                <div className="recipeContainer" key={`div${recipe._id}`}>
                  <PublicShortDetailedRecipe key={recipe._id} recipe={recipe} />
                </div>
              ))}

            {/* <p className="error">{error}</p> */}
          </div>{" "}
        </div>{" "}
        <div>
          {showMore && (
            <button className="btnForm" onClick={handleShowMore}>
              SHOW MORE
            </button>
          )}
        </div>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <div>
      <header className="hero">
        <div className="content">
          <h1>Hungry?</h1>
          <p>Try this Avacado-Egg Toast recipe</p>
          <Link to={"/recipes/66cfbecfd8c48a91a918f980"} className="headerLink">
            View recipe
          </Link>
        </div>
      </header>
      <h1 className="title">Struggle Meal Recipes</h1>
      <h2 className="title">Recent</h2>
      <>{isLoading ? loading() : loaded()}</>
      <div className="homeSignup">
        <h1 className="title">Want to share?</h1>
        <div>
          <button onClick={handlesignup} className="btnForm">
            SIGNUP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
