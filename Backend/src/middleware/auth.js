const jwt = require("jsonwebtoken");

const authRoute = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).end("Please login");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req._id = payload._id;
  next();
};

module.exports = authRoute;
