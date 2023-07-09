import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
class JWTservice {
  signJWT = (data) => {
    return jwt.sign(data, JWT_SECRET, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    });
  };
  verifyJWT = (jwtToken) => {
    return jwt.verify(jwtToken, JWT_SECRET);
  };
}
export default JWTservice;
