import { body } from "express-validator";

export const loginValidation = [
  body("email", "The email format is wrong.").isEmail(),
  body("password", "The password must be minimum 5 symbols.").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "The email format is wrong.").isEmail(),
  body("password", "The password must be minimum 5 symbols.").isLength({
    min: 5,
  }),
  body("fullName", "The full name is required.").isLength({ min: 2 }),
  body("avatarUrl", "The url is wrong.").optional().isURL(),
];

export const postValidation = [
  body("title", "The title is required.").isLength({ min: 2 }).isString(),
  body("text", "The text is required.")
    .isLength({
      min: 5,
    })
    .isString(),
  body("tags", "The tags format is wrong(must be string).")
    .optional()
    .isString(),
  body("imageUrl", "The url is wrong.").optional().isString(),
];
