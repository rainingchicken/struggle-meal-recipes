import { apiSlice } from "./apiSlice.tsx";

export const recipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipes: builder.mutation({
      query: (queries) => ({
        url: `/api/struggle-meals?${queries}`,
        method: "GET",
      }),
    }),
    getRecipe: builder.mutation({
      query: (data) => ({
        url: `/api/struggle-meals/${data}`,
        method: "GET",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllRecipesMutation,
  useGetRecipeMutation,
} = recipeApiSlice;
