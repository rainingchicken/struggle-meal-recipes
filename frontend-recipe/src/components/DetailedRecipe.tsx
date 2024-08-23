import { useEffect, useState } from "react";
import IIngredients from "../interfaces/IIngredients";
import IRecipeDetails from "../interfaces/IRecipeDetails";
import { useGetPersonalRecipeMutation } from "../slices/personalRecipeSlice";

interface IParams {
  _id: string | any;
}

const DetailedRecipe = ({ _id }: IParams) => {
  const [recipe, setRecipe] = useState<Array<IRecipeDetails> | any>([]);
  const [error, setError] = useState<string | null>(null);

  const [getRecipeAPICall, { isLoading }] = useGetPersonalRecipeMutation();

  const fetchRecipe = async () => {
    try {
      const res = await getRecipeAPICall(_id).unwrap();
      setRecipe(res);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot set error");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const title = recipe.title;
  const categories = recipe.categories;
  const servings = recipe.servings;
  const author = recipe.user;
  const vegan = recipe.vegan;
  const desperation = recipe.desperation;
  const health = recipe.health;
  const ingredients = recipe.ingredients;
  const procedures = recipe.procedures;

  return (
    <div>
      {!isLoading ? (
        <div>
          <h1>{title}</h1>
          <p>Categories: {categories}</p>
          <p>Servings: {servings}</p>
          <p>Vegan: {vegan ? "Yes" : "No"}</p>
          <p>Desperation Level: {desperation}</p>
          <p>Healthy Meter: {health}</p>
          <p>Author: {author}</p>
          <p>
            Ingredients:
            {ingredients &&
              ingredients.map((ingredient: IIngredients) => (
                <li key={ingredient._id}>
                  {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
                </li>
              ))}
          </p>
          <p>
            Procedures:
            {procedures &&
              procedures.map((procedure: string, index: number) => (
                <li key={index}>{procedure}</li>
              ))}
          </p>
          <p className="error">{error}</p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default DetailedRecipe;
