import { apiSlice } from "./apiSlice.tsx";

export const personalRecipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //-- recipes --//
    getAllPersonalRecipes: builder.mutation({
      query: () => ({
        url: `/api/recipes`,
        method: "GET",
      }),
    }),
    getPersonalRecipe: builder.mutation({
      query: (_id) => ({
        url: `/api/recipes/${_id}`,
        method: "GET",
      }),
    }),
    createPersonalRecipe: builder.mutation({
      query: (data) => ({
        url: `/api/recipes`,
        method: "POST",
        body: data,
      }),
    }),
    deletePersonalRecipe: builder.mutation({
      query: (data) => ({
        url: `/api/recipes/${data}`,
        method: "DELETE",
        body: data,
      }),
    }),
    updatePersonalRecipe: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/recipes/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    //-- ingredients --//
    getAllPersonalRecipesIngredients: builder.mutation({
      query: (_id) => ({
        url: `/api/recipes/${_id}/ingredients`,
        method: "GET",
      }),
    }),
    getPersonalRecipesIngredient: builder.mutation({
      query: ({ _id, ingredient_id }) => ({
        url: `/api/recipes/${_id}/ingredients/${ingredient_id}`,
        method: "GET",
      }),
    }),
    createPersonalRecipesIngredient: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/api/recipes/${_id}/ingredients`,
        method: "POST",
        body: data,
      }),
    }),
    deletePersonalRecipesIngredient: builder.mutation({
      query: ({ _id, ingredient_id, data }) => ({
        url: `/api/recipes/${_id}/ingredients/${ingredient_id}`,
        method: "DELETE",
        body: data,
      }),
    }),
    updatePersonalRecipesIngredient: builder.mutation({
      query: ({ _id, ingredient_id, data }) => ({
        url: `/api/recipes/${_id}/ingredients/${ingredient_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllPersonalRecipesMutation,
  useGetPersonalRecipeMutation,
  useCreatePersonalRecipeMutation,
  useDeletePersonalRecipeMutation,
  useUpdatePersonalRecipeMutation,

  useGetAllPersonalRecipesIngredientsMutation,
  useGetPersonalRecipesIngredientMutation,
  useCreatePersonalRecipesIngredientMutation,
  useDeletePersonalRecipesIngredientMutation,
  useUpdatePersonalRecipesIngredientMutation,
} = personalRecipeApiSlice;
