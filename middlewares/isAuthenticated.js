import User from "../models/user.js";
import JWTservice from "../services/JWTservice.js";
const jwt = new JWTservice();
const isAuthenticated = async (req, res, next) => {
  try {
    console.log("req.cookie is : ", req.cookies);
    if (req.cookies.auth_cookie) {
      const authToken = req.cookies.auth_cookie;
      const decoded = jwt.verifyJWT(authToken);
      console.log("decoded is : ", decoded);
      const isJwtExpired =
        decoded.exp <= Math.floor(Date.now() / 1000) ? true : false;

      if (!isJwtExpired) {
        const user = await User.findById({ _id: decoded._id }).select(
          "-password"
        );
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          status: 401,
          message: "JWT is expired!",
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        message: "user is unauthorized!",
      });
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
    });
  }
};
export default isAuthenticated;
