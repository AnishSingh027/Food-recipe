const Recipe = require("../models/recipe");

const addRecipe = async (req, res) => {
  const { category, recipeName, recipe, photoUrl } = req.body;

  try {
    const recipeData = new Recipe({
      uploadedBy: req._id,
      category,
      recipeName,
      recipe,
      photoUrl,
    });

    await recipeData.save();
    return res.status(201).end("Recipe added");
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const showLoggedInUserRecipe = async (req, res) => {
  try {
    const loggedInUserRecipe = await Recipe.find({ uploadedBy: req._id });
    return res.json({ loggedInUserRecipe });
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const showAllRecipe = async (req, res) => {
  try {
    const allRecipe = await Recipe.find({}).populate("uploadedBy", [
      "firstName",
      "lastName",
    ]);
    return res.json({ allRecipe });
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const showRecipeOfSpecifiedUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const userRecipies = await Recipe.find({ uploadedBy: userId }).populate(
      "uploadedBy",
      ["firstName", "lastName"]
    );
    return res.status(200).json({ userRecipies });
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const updateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const allowedFields = ["recipeName", "photoUrl", "category", "recipe"];

  try {
    const isAllowed = Object.keys(req.body).every((field) =>
      allowedFields.includes(field)
    );

    if (!isAllowed) {
      throw new Error("Update only allowed fields");
    }

    const recipe = await Recipe.findById(recipeId);

    if (recipe.uploadedBy.toString() !== req._id) {
      throw new Error("Only edit own recipe");
    }

    await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      {
        $set: {
          recipeName: req.body.recipeName,
          recipe: req.body.recipe,
          photoUrl: req.body.photoUrl,
          category: req.body.category,
        },
      },
      { runValidators: true }
    );

    return res.status(200).end("User data updated successfully");
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  try {
    const recipe = await Recipe.findById(recipeId);

    if (recipe.uploadedBy.toString() !== req._id) {
      throw new Error("Only delete own recipe");
    }

    await Recipe.findByIdAndDelete(recipeId);

    return res.status(200).end("Recipe removed successfully");
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

module.exports = {
  addRecipe,
  showLoggedInUserRecipe,
  showAllRecipe,
  showRecipeOfSpecifiedUser,
  updateRecipe,
  deleteRecipe,
};
