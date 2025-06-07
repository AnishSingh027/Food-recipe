const User = require("../models/user");

const viewProfile = async (req, res) => {
  const _id = req._id;
  try {
    const user = await User.findById({ _id });
    return res.json({ user });
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

const editProfile = async (req, res) => {
  const _id = req._id;

  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "about",
    ];

    const isAllowed = Object.keys(req.body).every((field) =>
      allowedFields.includes(field)
    );

    if (!isAllowed) {
      throw new Error("Edit only allowed fields");
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          gender: req.body.gender,
          photoUrl: req.body.photoUrl,
          about: req.body.about,
        },
      },
      { runValidators: true, new: true }
    );

    return res
      .status(200)
      .json({ message: "User profile updated successfully", updatedUser });
  } catch (error) {
    return res.status(400).end(error.message);
  }
};

module.exports = { viewProfile, editProfile };
