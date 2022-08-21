import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { registerValidation } from "./validations/auth.js";

const app = express();

dotenv.config();

const url = process.env.DB_URL;
const port = process.env.PORT;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

app.use(express.json());

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: req.body.fullName,
    },
    jwtSecretKey
  );

  res.json({ success: true, token });
});

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("The Server is running.");
});

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
