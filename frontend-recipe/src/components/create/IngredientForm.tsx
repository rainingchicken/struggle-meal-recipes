import { FormEvent, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  useCreatePersonalRecipesIngredientMutation,
  // useDeletePersonalRecipeMutation,
} from "../../slices/personalRecipeSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIngredients } from "../../slices/ingredientsSlice";

interface IParams {
  recipe_id: string | undefined;
  // userAction: string;
  //  if mode === create, navigate to /create/${recipe_id}`
  //  if mode === edit, navigate to /edit/${recipe_id}`
}

const IngredientForm = ({ recipe_id }: IParams) => {
  // const { ingredients, setIngredients } = useContext(IngredientContext);
  const [ingredient, setIngredient] = useState({
    amount: 0,
    unit: "",
    ingredient: "",
  });
  const dispatch = useDispatch();
  const ingredients = useSelector((state: any) => state.ingredients.state);

  const [error, setError] = useState<string | null>(null);

  // const navigate = useNavigate();

  const [
    createIngredientAPICall,
  ] = useCreatePersonalRecipesIngredientMutation();
  // const [deleteRecipeAPICall] = useDeletePersonalRecipeMutation();

  const handleChange = (e: FormEvent) => {
    const { name, type } = e.target as HTMLInputElement;
    if (type === "number") {
      setIngredient((state) => ({
        ...state,
        [name]: +(e.target as HTMLInputElement).value,
      }));
    } else {
      setIngredient((state) => ({
        ...state,
        [name]: (e.target as HTMLInputElement).value,
      }));
    }
    // console.log(type);
    // if (type === "number") {
    //   dispatch(setIngredients(+(e.target as HTMLInputElement).value));
    // } else {
    //   dispatch(setIngredients((e.target as HTMLInputElement).value));
    // }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newIngredient = {
      amount: ingredient.amount,
      unit: ingredient.unit,
      ingredient: ingredient.ingredient,
      recipe_id: recipe_id,
    };
    try {
      const res = await createIngredientAPICall({
        _id: recipe_id,
        data: newIngredient,
      }).unwrap();
      setIngredient(res);
      const newIngredients = [...ingredients]
        .concat([res])
        .map((theseIngredients) => {
          return theseIngredients;
        });
      // console.log(newIngredients);
      dispatch(setIngredients(newIngredients));
      // setIngredient({ amount: 0, unit: "", ingredient: "" });
    } catch (error) {
      setError("Something went wrong. Cannot submit");
      console.log(error);
    }
  };

  // const handleBackButton = () => {
  //   // navigate(`/dashboard/edit/${recipe_id}`);
  //   if (userAction === "create") {
  //     navigate(`/create/${recipe_id}`);
  //   } else {
  //     navigate(`/dashboard/edit/${recipe_id}`);
  //   }
  //   // navigate("/create");
  // };

  // const handleNextButton = () => {
  //   if (userAction === "create") {
  //     navigate(`/${userAction}/${recipe_id}/procedures`);
  //   } else {
  //     navigate(`/dashboard/${userAction}/${recipe_id}/procedures`);
  //   }
  // };

  // const handleDeleteClick = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (userAction === "create") {
  //     try {
  //       await deleteRecipeAPICall(recipe_id).unwrap();
  //       console.log("deleted");
  //       navigate("/dashboard");
  //     } catch (error) {
  //       setError("Cant delete");
  //       console.log(error);
  //     }
  //   } else {
  //     navigate("/dashboard");
  //   }
  // };

  return (
    <>
      {/* {console.log(ingredients)} */}
      <form onSubmit={handleSubmit} className="ingredientsForm">
        <label htmlFor="amount">Amount</label>
        <input onChange={handleChange} type="number" name="amount" />
        <label htmlFor="unit">Unit</label>
        <input onChange={handleChange} type="text" name="unit" />
        <label htmlFor="ingredient">Ingredient name</label>
        <input onChange={handleChange} type="text" name="ingredient" />
        <button>ADD</button>
        <p className="error">{error}</p>
      </form>
      {/* <button onClick={handleBackButton}>BACK</button>
      <button onClick={handleNextButton}>NEXT</button>
      <button onClick={handleDeleteClick}>CANCEL</button> */}
    </>
  );
};

export default IngredientForm;
