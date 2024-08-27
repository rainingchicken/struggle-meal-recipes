import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.tsx";
import authReducer from "./slices/authSlice";
import proceduresReducer from "./slices/proceduresSlice";
import recipesReducer from "./slices/recipesSlice";
import ingredientsReducer from "./slices/ingredientsSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    procedures: proceduresReducer,
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
