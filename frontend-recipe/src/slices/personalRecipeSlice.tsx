import { apiSlice } from "./apiSlice.tsx";

export const personalRecipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetAllPersonalRecipesMutation,
  useGetPersonalRecipeMutation,
  useCreatePersonalRecipeMutation,
  useDeletePersonalRecipeMutation,
  useUpdatePersonalRecipeMutation,
} = personalRecipeApiSlice;
