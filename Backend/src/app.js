const express = require("express");
require("dotenv/config");
const dbConnect = require("./config/dbConnect");
const profileRoute = require("./routes/profile");
const authRoute = require("./routes/auth");
const recipeRoute = require("./routes/recipe");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/recipe", recipeRoute);

dbConnect()
  .then(() => {
    console.log("Database connected successfully!!!");
    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
  })
  .catch((err) => console.log("Database not connected"));
