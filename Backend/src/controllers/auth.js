const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  const { firstName, lastName, age, gender, photoUrl, about, email, password } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exist");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not Strong");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      age,
      gender,
      photoUrl,
      about,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).end("User created successfully");
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw new Error("Please enter email and password");

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

    return res
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({ message: "Welcome to our page", user });
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const userLogout = (req, res) => {
  try {
    return res
      .clearCookie("token", null, {
        maxAge: 0,
        httpOnly: true,
      })
      .end("User logged out");
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

module.exports = { userSignup, userLogin, userLogout };
