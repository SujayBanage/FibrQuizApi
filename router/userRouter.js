import express from "express";
import {
  addSolvedQuiz,
  getAllQuizesCreated,
  getAllQuizesSolved,
  getUserById,
} from "../controllers/userController.js";
const userRouter = new express.Router();

userRouter.route("/:id").get(getUserById);
userRouter.route("/:id/quizes_created").get(getAllQuizesCreated);
userRouter
  .route("/:id/quizes_completed")
  .get(getAllQuizesSolved)
  .post(addSolvedQuiz);
export default userRouter;
