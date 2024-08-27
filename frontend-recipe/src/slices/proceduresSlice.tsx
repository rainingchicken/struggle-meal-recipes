import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  steps: "",
};

const proceduresSlice = createSlice({
  name: "procedures",
  initialState,
  reducers: {
    setProcedures: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProcedures } = proceduresSlice.actions;

export default proceduresSlice.reducer;
