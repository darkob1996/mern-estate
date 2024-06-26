const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-__v");

  res.status(200).json({
    status: "success",
    data: {
      data: users,
    },
  });
};
