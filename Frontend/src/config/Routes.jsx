import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Approute from "./AppRoute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Protected from "./ProtectedRoute";
import MyRecipe from "../pages/MyRecipe";
import Profile from "../pages/Profile";
import AddRecipe from "../pages/AddRecipe";
import Recipe from "../pages/Recipe";
import EditRecipe from "../pages/EditRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Approute,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup,
      },
      {
        Component: Protected,
        children: [
          {
            index: true,
            Component: Home,
          },
          {
            path: "/about",
            Component: About,
          },
          {
            path: "/my-recipe",
            Component: MyRecipe,
          },
          {
            path: "/profile",
            Component: Profile,
          },
          {
            path: "/add-recipe",
            Component: AddRecipe,
          },
          {
            path: "/recipe/:recipeId",
            Component: Recipe,
          },
          {
            path: "/recipe/edit/:recipeId",
            Component: EditRecipe,
          },
        ],
      },
    ],
  },
]);

export default router;
