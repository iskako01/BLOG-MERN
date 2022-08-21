import { body } from "express-validator";

export const registerValidation = [
  body("email", "The email format is wrong.").isEmail(),
  body("password", "The password must be minimum 5 symbols.").isLength({
    min: 5,
  }),
  body("fullName", "The full name is required.").isLength({ min: 2 }),
  body("avatarUrl", "The url is wrong.").optional().isURL(),
];
