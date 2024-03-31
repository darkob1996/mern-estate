const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { catchAsync } = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    data: newUser,
  });
});
