import { useContext, useEffect, useState } from "react";
import IIngredients from "../../interfaces/IIngredients";
import { useGetAllPersonalRecipesIngredientsMutation } from "../../slices/personalRecipeSlice";
import { IngredientContext } from "../../context/IngredientContext";

interface IParams {
  _id: string;
}

const Ingredient = ({ _id }: IParams) => {
  const { ingredients, setIngredients } = useContext(IngredientContext);

  const [error, setError] = useState<string | null>(null);

  const [
    getAllRecipeIngredientAPICall,
  ] = useGetAllPersonalRecipesIngredientsMutation();

  const fetchRecipeIngredients = async () => {
    try {
      const res = await getAllRecipeIngredientAPICall(_id).unwrap();
      setIngredients(res);
      //   console.log(res);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot get ingredients");
    }
  };

  useEffect(() => {
    fetchRecipeIngredients();
  }, []);

  return (
    <div>
      <ul>
        {ingredients &&
          ingredients.map((ingredient: IIngredients) => (
            <li key={ingredient._id}>
              {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
            </li>
          ))}
      </ul>
      <p className="errors">{error}</p>
    </div>
  );
};

export default Ingredient;
