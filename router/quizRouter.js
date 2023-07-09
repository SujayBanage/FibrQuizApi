import express from "express";
import {
  createCategory,
  createQuiz,
  getAllCategories,
  getAllQuizes,
  getAllQuizesByCategory,
  getQuizById,
  shareQuiz,
} from "../controllers/quizController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const quizRouter = new express.Router();
quizRouter.use(isAuthenticated);
quizRouter.route("/").post(createQuiz).get(getAllQuizes);
quizRouter.route("/categories").get(getAllCategories).post(createCategory);
quizRouter.route("/:id").get(getQuizById);
quizRouter.route("/:id/share").get(shareQuiz);
quizRouter.route("/categories/:id/quizes").get(getAllQuizesByCategory);

export default quizRouter;
