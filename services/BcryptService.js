import { compare, hash, genSalt } from "bcrypt";
class BcryptService {
  generateHash = async (plainText) => {
    try {
      const salt = await genSalt(12);
      const hashedText = await hash(plainText, salt);
      return { hashedText, err: null };
    } catch (err) {
      return {
        hashedText: null,
        err,
      };
    }
  };
  compareHash = async (plainText, hashedText) => {
    try {
      const result = await compare(plainText, hashedText);
      return {
        result,
        err: null,
      };
    } catch (err) {
      return {
        result: null,
        err,
      };
    }
  };
}

export default BcryptService;
