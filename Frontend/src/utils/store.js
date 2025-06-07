import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import recipeSlice from "./recipeSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    recipe: recipeSlice,
  },
});

export default store;
