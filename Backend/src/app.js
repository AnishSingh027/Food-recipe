const express = require("express");
require("dotenv/config");
const dbConnect = require("./config/dbConnect");
const profileRoute = require("./routes/profile");
const authRoute = require("./routes/auth");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/profile", profileRoute);

dbConnect()
  .then(() => {
    console.log("Database connected successfully!!!");
    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
  })
  .catch((err) => console.log("Database not connected"));
