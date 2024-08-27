import { apiSlice } from "./apiSlice.tsx";

export const recipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipes: builder.mutation({
      query: () => ({
        url: `/api/struggle-meals`,
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
