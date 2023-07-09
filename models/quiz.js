import mongoose from "mongoose";

const timeSchema = mongoose.Schema({
  time_type: {
    type: String,
    enum: ["minutes", "hours"],
  },
  value: Number,
});

const optionSchema = mongoose.Schema({
  text: {
    type: String,
    require: [true, "option must have a text"],
  },
  option_type: {
    type: String,
    enum: ["correct", "incorrect"],
  },
});

const questionSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, "question must have a text"],
  },
  options: [optionSchema],
  marks: {
    type: Number,
    require: [true, "question must have marks"],
    min: 1,
  },
});

const quizSchema = mongoose.Schema({
  topic: {
    type: String,
    require: [true, "a quiz must have a topic"],
    unique: true,
  },
  category: {
    type: String,
    require: [true, "a quiz must have a category"],
    unique: true,
  },
  questions: [questionSchema],
  passing_score: {
    type: Number,
    require: [true, "a quiz must have a passing score"],
  },
  time: timeSchema,
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
