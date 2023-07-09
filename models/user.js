import mongoose from "mongoose";
import validator from "validator";

const quizSolvedSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  score: Number,
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, "user must have a username"],
    validate: {
      validator: (value) => {
        return validator.isAlphanumeric(value) ? true : false;
      },
      message: "username should only have characters and numbers",
    },
  },
  password: {
    type: String,
    require: [true, "user must have a password"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "user must have an email"],
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value) ? true : false;
      },
      message: (value) => `${value} is not a valid email!`,
    },
  },
  quizes_created: [mongoose.Schema.Types.ObjectId],
  quizes_solved: [quizSolvedSchema],
});

const User = mongoose.model("User", userSchema);
export default User;
