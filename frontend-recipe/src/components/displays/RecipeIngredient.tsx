// import { useEffect, useState } from "react";
// import IIngredients from "../../interfaces/IIngredients";
// import { useGetAllPersonalRecipesIngredientsMutation } from "../../slices/personalRecipeSlice";
// // import { RecipeIngredientContext } from "../../context/RecipeIngredientContext";
// import DetailedIngredient from "./DetailedIngredient";

// interface IParams {
//   _id: string | undefined;
// }

// //_id is the recipe._id
// const RecipeIngredient = ({ _id }: IParams) => {
//   // const { ingredient, setIngredient } = useContext(RecipeIngredientContext);
//   const [ingredient, setIngredient] = useState<any>([]);

//   const [error, setError] = useState<string | null>(null);

//   const [
//     getAllRecipeIngredientAPICall,
//     { isLoading },
//   ] = useGetAllPersonalRecipesIngredientsMutation();

//   const fetchRecipeIngredients = async () => {
//     try {
//       const res = await getAllRecipeIngredientAPICall(_id).unwrap();
//       setIngredient(res);
//       //   console.log(res);
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong. Cannot get ingredients");
//     }
//   };

//   useEffect(() => {
//     fetchRecipeIngredients();
//   }, []);

//   const loaded = () => {
//     return (
//       <>
//         <ul>
//           {ingredient &&
//             ingredient.map((ingredient: IIngredients) => (
//               <li key={ingredient._id}>
//                 <DetailedIngredient recipe_id={_id} ingredient={ingredient} />
//               </li>
//             ))}
//         </ul>
//         <p className="errors">{error}</p>
//       </>
//     );
//   };

//   return <>{isLoading ? <h1>Loading...</h1> : loaded()}</>;
// };

// export default RecipeIngredient;

const RecipeIngredient = () => {
  return <div>RecipeIngredient</div>;
};

export default RecipeIngredient;
