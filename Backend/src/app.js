const express = require("express");
require("dotenv/config");
const authRoute = require("./routes/auth");
const dbConnect = require("./config/dbConnect");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/auth", authRoute);

dbConnect()
  .then(() => {
    console.log("Database connected successfully!!!");
    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
  })
  .catch((err) => console.log("Database not connected"));
