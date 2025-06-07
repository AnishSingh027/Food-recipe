const express = require("express");
const { viewProfile, editProfile } = require("../controllers/profile");
const authRoute = require("../middleware/auth");

const router = express.Router();

router.get("/view", authRoute, viewProfile);
router.post("/edit", authRoute, editProfile);

module.exports = router;
