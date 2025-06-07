import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: [],
  reducers: {
    addRecipe(state, action) {
      return action.payload;
    },
    addSingleRecipe(state, action) {
      return state.push(action.payload);
    },
  },
});

export const { addRecipe, addSingleRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
