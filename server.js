import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config.js";
import databaseConnection from "./db/connection.js";
import authRouter from "./router/authRouter.js";
import quizRouter from "./router/quizRouter.js";
import userRouter from "./router/userRouter.js";

const app = express();
const port = 8000 || PORT;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/user", userRouter);

databaseConnection()
  .then((db_connection_result) => {
    if (db_connection_result?.connections?.length > 0) {
      app.listen(port, () => {
        console.log(`server listening to port : ${port}`);
      });
    }
  })
  .catch((err) => {
    console.log(`error while starting the server : ${err}`);
  });

export default app;
