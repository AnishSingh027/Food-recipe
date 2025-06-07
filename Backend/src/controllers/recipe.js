const Recipe = require("../models/recipe");
const mongoose = require("mongoose");

const addRecipe = async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    cuisine,
    image,
    category,
  } = req.body;

  try {
    const recipeData = new Recipe({
      createdBy: req._id,
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      cuisine,
      image,
      category,
    });

    await recipeData.save();
    return res.status(201).end("Recipe added");
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const showLoggedInUserRecipe = async (req, res) => {
  try {
    const loggedInUserRecipe = await Recipe.find({ createdBy: req._id });
    return res.json({ loggedInUserRecipe });
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const showAllRecipe = async (req, res) => {
  try {
    const allRecipe = await Recipe.find({}).populate("createdBy", [
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
    const userRecipies = await Recipe.find({
      createdBy: new mongoose.Types.ObjectId(userId),
    }).populate("createdBy", ["firstName", "lastName"]);
    return res.status(200).json({ userRecipies });
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const updateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const allowedFields = [
    "title",
    "description",
    "ingredients",
    "instructions",
    "cookingTime",
    "cuisine",
    "image",
    "category",
  ];

  try {
    const isAllowed = Object.keys(req.body).every((field) =>
      allowedFields.includes(field)
    );

    if (!isAllowed) {
      throw new Error("Update only allowed fields");
    }

    const recipe = await Recipe.findById(recipeId);

    if (recipe.createdBy.toString() !== req._id) {
      throw new Error("Only edit own recipe");
    }

    await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          ingredients: req.body.ingredients,
          instructions: req.body.instructions,
          cookingTime: req.body.cookingTime,
          cuisine: req.body.cuisine,
          image: req.body.image,
          category: req.body.category,
        },
      },
      { runValidators: true }
    );

    return res.status(200).end("Recipe data updated successfully");
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;
  console.log(recipeId);
  try {
    const recipe = await Recipe.findById(recipeId).populate("createdBy", [
      "firstName",
      "lastName",
    ]);
    if (!recipe) {
      throw new Error("Recipe not found");
    }
    return res.status(200).json({ recipe });
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  try {
    const recipe = await Recipe.findById(recipeId).populate("createdBy", [
      "firstName",
      "lastName",
    ]);

    if (recipe.createdBy._id.toString() !== req._id) {
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
  getRecipeById,
};
