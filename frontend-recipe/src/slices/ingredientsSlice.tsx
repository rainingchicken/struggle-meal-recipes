import { createSlice } from "@reduxjs/toolkit";
import IIngredients from "../interfaces/IIngredients";

const initialState: Array<IIngredients> = [];

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      return { ...state, state: action.payload };
    },
  },
});

export const { setIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
