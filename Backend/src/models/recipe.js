const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  category: {
    type: String,
    enum: ["veg", "non veg"],
    required: true,
    lowecase: true,
  },
  recipeName: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length > 20 || value.length < 3) {
        throw new Error("Recipe name should have 3-20 characters");
      }
    },
  },
  recipe: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length > 2000 || value.length < 10) {
        throw new Error("Recipe name should have 10-2000 characters");
      }
    },
  },
  photoUrl: {
    type: String,
    default:
      "https://derafarms.com/cdn/shop/files/deraproducts-2024-06-26T165127.117.png?v=1719400896",
  },
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
