import { useEffect, useState } from "react";
import { useGetAllPersonalRecipesMutation } from "../../slices/personalRecipeSlice.tsx";
import ShortDetailedRecipe from "../../components/displays/ShortDetailedRecipe.tsx";
import { useNavigate } from "react-router-dom";
// import { RecipeContext } from "../../context/RecipeContext.tsx";
import IRecipeDetails from "../../interfaces/IRecipeDetails.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../../slices/recipesSlice.tsx";

const Dashboard = () => {
  // const [recipes, setRecipes] = useState<null | Array<IRecipeDetails>>(null);
  // const { recipes, setRecipes } = useContext(RecipeContext);
  // const [recipes, setRecipes] = useState<any>([]);
  const dispatch = useDispatch();
  const recipes = useSelector((state: any) => state.recipes.state);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [
    getAllRecipesAPICall,
    { isLoading },
  ] = useGetAllPersonalRecipesMutation();

  const fetchRecipes = async () => {
    try {
      const res = await getAllRecipesAPICall(null).unwrap();
      dispatch(setRecipes(res));
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot get recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
    document.title = "Dashboard";
  }, []);

  const handleCreateRecipe = () => {
    navigate("/create");
  };

  const loaded = () => {
    return (
      <div className="recipeParentParentContainer">
        <div className="recipeParentContainer">
          {/* {console.log(recipes)} */}
          {recipes &&
            recipes.map((recipe: IRecipeDetails) => (
              <div className="recipeContainer" key={`div${recipe._id}`}>
                <ShortDetailedRecipe key={recipe._id} recipe={recipe} />{" "}
              </div>
            ))}
          <p className="error">{error}</p>
        </div>
      </div>
    );
  };
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <button className="btnForm" onClick={handleCreateRecipe}>
        Create new recipe
      </button>
      <>{isLoading ? loading() : loaded()}</>
    </div>
  );
};

export default Dashboard;
