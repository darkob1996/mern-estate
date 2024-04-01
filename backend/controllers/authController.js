const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  // 1. Check if user exists
  if (!user) {
    return next(new AppError("Wrong email or password.", 400));
  }

  // 2. Check if inputted password is correct
  if (!(await user.isPasswordCorrect(password, user.password))) {
    return next(new AppError("Wrong email or password.", 400));
  }

  // 3. Create JWT for the signed in user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  const { password: pass, ...otherInfo } = user._doc;

  res
    .cookie("access_token", token, { httpOnly: true, expiresIn: 60 })
    .status(200)
    .json({
      status: "success",
      data: {
        user: otherInfo,
      },
    });
});
