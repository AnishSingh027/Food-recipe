const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    ingredients: {
      type: [String],
      required: [true, "Ingredients are required"],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) &&
          arr.length > 0 &&
          arr.every(
            (i) =>
              typeof i === "string" &&
              i.trim() !== "" &&
              i.length > 0 &&
              i.length <= 500
          ),
        message: "Ingredients must be a non-empty array of non-empty strings",
      },
    },
    instructions: {
      type: [String],
      required: [true, "Instructions are required"],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) &&
          arr.length > 0 &&
          arr.every(
            (i) =>
              typeof i === "string" &&
              i.trim() !== "" &&
              i.length > 0 &&
              i.length <= 500
          ),
        message: "Instructions must be a non-empty array of non-empty strings",
      },
    },
    cookingTime: {
      type: Number, // in minutes
      required: [true, "Cooking time is required"],
      min: [1, "Cooking time must be at least 1 minute"],
    },
    cuisine: {
      type: String,
      required: true,
      enum: ["Indian", "Italian", "Chinese", "American"], // extend as needed
    },
    image: {
      type: String, // URL or path to image
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ1kcoiXbqzazXFd2VrQPaheS9YU7Bss8eHw&s",
    },
    category: {
      type: String,
      enum: ["veg", "non veg"],
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
