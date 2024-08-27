import { useEffect, useState } from "react";
import IIngredients from "../../interfaces/IIngredients";
import { useGetAllPersonalRecipesIngredientsMutation } from "../../slices/personalRecipeSlice";
// import { IngredientContext } from "../../context/IngredientContext.tsx";
import DetailedIngredient from "./DetailedIngredient";
import { useDispatch, useSelector } from "react-redux";
import { setIngredients } from "../../slices/ingredientsSlice";

interface IParams {
  _id: string | undefined;
  user: string | undefined;
}

const Ingredient = ({ _id, user }: IParams) => {
  // const { ingredients, setIngredients } = useContext(IngredientContext);
  // const [ingredients, setIngredients] = useState<any>([]);
  const dispatch = useDispatch();
  const ingredients = useSelector((state: any) => state.ingredients.state);

  const [error, setError] = useState<string | null>(null);

  const [
    getAllRecipeIngredientAPICall,
    { isLoading },
  ] = useGetAllPersonalRecipesIngredientsMutation();

  const fetchRecipeIngredients = async () => {
    try {
      const res = await getAllRecipeIngredientAPICall(_id).unwrap();
      dispatch(setIngredients(res));
      // console.log(res);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot get ingredients");
    }
  };

  useEffect(() => {
    fetchRecipeIngredients();
  }, []);

  const loaded = () => {
    return (
      <>
        <ul>
          {/* {console.log(ingredients)} */}
          {ingredients &&
            ingredients.map((ingredient: IIngredients) => (
              <li key={ingredient._id}>
                <DetailedIngredient
                  recipe_id={_id}
                  user={user}
                  ingredient={ingredient}
                />
              </li>
            ))}
        </ul>
        <p className="errors">{error}</p>
      </>
    );
  };

  return <>{isLoading ? <h1>Loading...</h1> : loaded()}</>;
};

export default Ingredient;
