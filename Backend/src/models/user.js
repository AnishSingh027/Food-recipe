const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length > 20 || value.length < 3) {
        throw new Error("Firstname should be between 3-20 characters");
      }
    },
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length > 20 || value.length < 3) {
        throw new Error("Lastname should be between 3-20 characters");
      }
    },
  },
  age: {
    type: Number,
    min: 10,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
    lowercase: true,
    trim: true,
  },
  photoUrl: {
    type: String,
    default:
      "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
  },
  about: {
    type: String,
    default: "I am a good chef.",
    trim: true,
    validate(value) {
      if (value.length > 100 || value.length < 3) {
        throw new Error("About should be between 3-100 characters");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
