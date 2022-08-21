import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../const.js";

export default (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecretKey);

      req.userId = decoded._id;
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        message: "No access.",
      });
    }
  } else {
    return res.status(403).json({
      message: "No access.",
    });
  }
};
