const express = require("express");
const {
  addRecipe,
  showLoggedInUserRecipe,
  showAllRecipe,
  showRecipeOfSpecifiedUser,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe");
const authRoute = require("../middleware/auth");

const router = express.Router();

router.post("/add", authRoute, addRecipe);
router.get("/", authRoute, showLoggedInUserRecipe);
router.get("/all", authRoute, showAllRecipe);
router.get("/:userId", authRoute, showRecipeOfSpecifiedUser);
router.patch("/:recipeId", authRoute, updateRecipe);
router.delete("/:recipeId", authRoute, deleteRecipe);

module.exports = router;
