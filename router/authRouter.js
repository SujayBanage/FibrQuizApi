import express from "express";
import { loginHandler, signupHandler } from "../controllers/authController.js";
const authRouter = new express.Router();

authRouter.route("/signup").post(signupHandler);
authRouter.route("/login").post(loginHandler);

export default authRouter;
