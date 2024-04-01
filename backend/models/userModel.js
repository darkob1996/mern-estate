const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hashSync(this.password, 10);
  this.password = hashedPassword;

  next();
});

userSchema.methods.isPasswordCorrect = function (
  inputtedPassword,
  encryptedPassword
) {
  return bcrypt.compareSync(inputtedPassword, encryptedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
