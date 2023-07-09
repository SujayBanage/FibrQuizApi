import Quiz from "../models/quiz.js";
import User from "../models/user.js";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById({ _id: id }).select("-password");
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found!",
      });
    }

    return res.status(200).json({
      status: 200,
      user,
    });
  } catch (err) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
};

export const getAllQuizesCreated = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found!",
      });
    }

    const quizes = await Quiz.find({ _id: { $in: [...user.quizes_created] } });

    if (quizes.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Quizes not found!",
      });
    }
    return res.status(200).json({
      status: 200,
      quizes,
    });
  } catch (err) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
};

export const getAllQuizesSolved = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found!",
      });
    }

    const quiz_ids = user.quizes_solved.map(({ _id, score }) => _id);

    const quizes = await Quiz.find({ _id: { $in: [...quiz_ids] } });

    if (quizes.length < 0) {
      return res.status(404).json({
        status: 404,
        message: "Quizes not found!",
      });
    }

    return res.status(200).json({
      status: 200,
      quizes,
    });
  } catch (err) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
};

export const addSolvedQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, score } = req.body;

    if (!_id || !score) {
      return res.status(400).json({
        status: 400,
        message: "please provide all details!",
      });
    }

    const isQuizExists = await Quiz.findById({ _id: _id });

    if (!isQuizExists) {
      return res.status(404).json({
        status: 404,
        message: "Quiz not found!",
      });
    }

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found!",
      });
    }

    const updatedUser = await User.updateOne(
      { _id: id },
      { $push: { quizes_solved: { _id, score } } },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(500).json({
        status: 500,
        message: "User update failed!!",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User update successfull!",
    });
  } catch (err) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
};
