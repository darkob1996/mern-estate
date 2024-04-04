const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email })
    .select("+password")
    .select("-__v -_id");

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

  user.password = undefined;

  res
    .cookie("access_token", token, { httpOnly: true, expiresIn: 60 })
    .status(200)
    .json({
      status: "success",
      data: {
        user: user,
      },
    });
});

exports.google = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    user.password = undefined;

    res.cookie("access_token", token, { httpOnly: true });

    res.status(200).json({
      user,
    });
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
    const newUser = await User.create({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    newUser.password = undefined;

    res.cookie("access_token", token, { httpOnly: true });

    res.status(200).json(user);
  }
});
