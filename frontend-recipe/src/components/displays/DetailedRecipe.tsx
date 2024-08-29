import { useEffect, useState } from "react";
import IRecipeDetails from "../../interfaces/IRecipeDetails";
import {
  useDeletePersonalRecipeMutation,
  useGetPersonalRecipeMutation,
} from "../../slices/personalRecipeSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Ingredient from "./Ingredient";
import Procedures from "./Procedures";
import { toast } from "react-toastify";

interface IParams {
  _id: string | any;
}

const DetailedRecipe = ({ _id }: IParams) => {
  const { userInfo } = useSelector((state: any) => state.auth);

  const [recipe, setRecipe] = useState<Array<IRecipeDetails> | any>([]);

  // const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [getRecipeAPICall, { isLoading }] = useGetPersonalRecipeMutation();

  const [deleteRecipeAPICall] = useDeletePersonalRecipeMutation();

  const fetchRecipe = async () => {
    try {
      const res = await getRecipeAPICall(_id).unwrap();
      setRecipe(res);
      // console.log(res);
    } catch (err) {
      console.log(err);
      // setError("Something went wrong. Cannot set error");
      toast.dark("Something went wrong. Cannot delete the recipe");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleDeleteClick = async () => {
    try {
      await deleteRecipeAPICall(recipe._id).unwrap();
      console.log("deleted");
      toast.dark("Recipe deleted!");
      navigate("/dashboard");
    } catch (error) {
      toast.dark("Something went wrong. Cannot get the delete");
      console.log(error);
    }
  };

  const handleEditClick = () => {
    navigate(`/dashboard/edit/${recipe._id}`);
  };

  return (
    <div className="recipeLongDetailedContainerparent">
      <div className="recipeLongDetailedContainer">
        {!isLoading ? (
          <div className="">
            {userInfo._id === recipe.user &&
            location.pathname == `/recipes/${recipe._id}` ? (
              <>
                <button onClick={handleEditClick}>EDIT</button>
                <button onClick={handleDeleteClick}>DELETE</button>
              </>
            ) : (
              <></>
            )}
            <div className="recipeLongDetailed">
              <h1>{recipe.title}</h1>
              <p>Chef: {recipe.user}</p>
              <p className="recipeDetailstime">
                {recipe.createdAt && (
                  <>
                    <span>
                      Last updated: {recipe.createdAt.slice(0, 10)} |{" "}
                    </span>
                    <span>Last updated: {recipe.updatedAt.slice(0, 10)}</span>
                  </>
                )}
              </p>

              <p>Categories: {recipe.categories}</p>

              <p>Servings: {recipe.servings}</p>

              <p>Vegan: {recipe.vegan !== "notvegan" ? "✔️" : "✖️"}</p>

              <p>
                {" "}
                Desperation Level:{" "}
                <span className="recipeDetailsHealth">
                  {recipe.desperation}
                </span>
              </p>

              <p>
                {" "}
                Healthy Meter:{" "}
                <span className="recipeDetailsHealth">{recipe.health}</span>
              </p>
            </div>
            <p>Ingredient</p>
            {recipe._id ? (
              <div className="recipedetailedingredient">
                <Ingredient _id={recipe._id} user={recipe.user} />
              </div>
            ) : (
              <>Loading...</>
            )}
            <div>
              Procedures:
              {recipe._id ? <Procedures _id={recipe._id} /> : <>Loading...</>}
            </div>
            {/* <p className="error">{error}</p> */}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default DetailedRecipe;
