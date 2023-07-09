import Category from "../models/category.js";
import Quiz from "../models/quiz.js";
import User from "../models/user.js";

export const createQuiz = async (req, res) => {
  try {
    const { topic, questions, category, passing_score, time } = req.body;

    if (!topic || !questions || !category || !passing_score || !time) {
      return res.status(400).json({
        status: 400,
        message: "Please provide all details!",
      });
    }

    const quizWithSameTopic = await Quiz.findOne({ topic });
    if (quizWithSameTopic) {
      return res.status(409).json({
        status: 409,
        message: `quiz with name ${topic} already exists!`,
      });
    }
    const quiz = await Quiz.create({
      topic,
      questions,
      passing_score,
      time,
      category,
    });

    await Category.findOneAndUpdate(
      { name: category },
      { $push: { quizes: quiz._id } }
    );

    await User.updateOne(
      { _id: req.user._id },
      { $push: { quizes_created: quiz._id } }
    );

    return res.status(201).json({
      status: 201,
      message: `Quiz ${topic} created successfully!`,
      quiz_id: quiz._id,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
};

export const getAllQuizes = async (req, res) => {
  try {
    const quizes = await Quiz.find({});
    if (quizes.length > 0) {
      return res.status(200).json({
        status: 200,
        quizes,
      });
    }
    return res.status(404).json({
      status: 404,
      message: "Quizes not found!!",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
};

export const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById({ _id: id });
    if (quiz) {
      return res.status(200).json({
        status: 200,
        message: "quiz found successfully!",
        quiz,
      });
    }
    return res.status(404).json({
      status: 404,
      message: "quiz not found!",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 400,
        message: "Please provide all details!",
      });
    }

    const isCategoryExists = await Category.findOne({ name });
    if (isCategoryExists) {
      return res.status(409).send({
        status: 409,
        message: "category already exists!",
      });
    }
    const category = await Category.create({
      name,
    });
    return res.status(201).json({
      status: 201,
      message: "Category created successfully!",
      category_id: category._id,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  console.log("get all categories is running!!");
  try {
    const categories = await Category.find();

    if (categories.length > 0) {
      return res.status(200).json({
        status: 200,
        categories,
      });
    }
    return res.status(404).json({
      status: 404,
      message: "Catgories not found!",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
};

export const getAllQuizesByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById({ _id: id });

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "Category not found!",
      });
    }
    const quizes = await Quiz.find({ category: category.name });
    if (quizes.length > 0) {
      return res.status(200).json({
        status: 200,
        quizes,
      });
    }

    console.log("category topic is : ", category.name);

    return res.status(404).json({
      status: 404,
      message: `No quizes in category ${category.name}`,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
};

export const shareQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById({ _id: id });

    if (!quiz) {
      return res.status(404).json({
        status: 404,
        message: "quiz not found!",
      });
    }
    return res.status(200).json({
      status: 200,
      url:
        process.env.NODE_ENV === "production"
          ? "https"
          : "http" + "://" + req.get("host") + "/api/quiz/" + id,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
};
