import { createSlice } from "@reduxjs/toolkit";
import IRecipeDetails from "../interfaces/IRecipeDetails";

// const initialState = {
//   categories: "",
//   servings: 1,
//   vegan: false,
//   desperation: 0,
//   health: 0,
//   user: "",
// };

const initialState: Array<IRecipeDetails> = [];

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      return { ...state, state: action.payload };
    },
  },
});

export const { setRecipes } = recipesSlice.actions;

export default recipesSlice.reducer;
