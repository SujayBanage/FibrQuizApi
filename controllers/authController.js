import User from "../models/user.js";
import isExists from "../utility/isExists.js";
import BcryptService from "../services/BcryptService.js";
import JWTservice from "../services/JWTservice.js";
const bcrypt = new BcryptService();
const jwt = new JWTservice();

export const signupHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "please provide all details!",
      });
    }

    const { found, result } = await isExists(User, null, email, res);

    if (found && result === null) {
      return res.status(409).json({
        status: 409,
        message: "User Already Exists!",
      });
    }

    const { hashedText, err } = await bcrypt.generateHash(password);

    if (hashedText && err === null) {
      const user = await User.create({
        username,
        password: hashedText,
        email,
      });

      const authToken = jwt.signJWT({ _id: user._id });

      res.cookie("auth_cookie", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24hrs
      });

      return res.status(201).json({
        message: "User created successfully!",
        status: 201,
        user_id: user._id,
      });
    } else {
      return res.status(500).send({
        message: "internal server error",
        status: 500,
      });
    }
  } catch (err) {
    console.log("err is : ", err);
    return res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "please provide all details!",
      });
    }

    const { found, result } = await isExists(User, null, email, res);

    console.log("found : ", found);
    console.log("result : ", result);

    let compareResult;

    if (found && result !== null) {
      compareResult = await bcrypt.compareHash(password, result.password);
      console.log("compare result is : ", compareResult);
    }

    if (compareResult.result) {
      const authToken = jwt.signJWT({ _id: result._id });

      console.log("auth token is : ", authToken);

      res.cookie("auth_cookie", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24hrs
      });
      return res.status(200).json({
        status: 200,
        message: "User login successfull!!",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "User not found!",
      });
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
};
