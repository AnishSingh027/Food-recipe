const express = require("express");
const {
  addRecipe,
  showLoggedInUserRecipe,
  showAllRecipe,
  showRecipeOfSpecifiedUser,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
} = require("../controllers/recipe");
const authRoute = require("../middleware/auth");

const router = express.Router();

router.post("/add", authRoute, addRecipe);
router.get("/", authRoute, showLoggedInUserRecipe);
router.get("/all", authRoute, showAllRecipe);
router.get("/user/:userId", authRoute, showRecipeOfSpecifiedUser);
router.get("/:recipeId", authRoute, getRecipeById);
router.post("/:recipeId", authRoute, updateRecipe);
router.delete("/:recipeId", authRoute, deleteRecipe);

module.exports = router;
