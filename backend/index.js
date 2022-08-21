import express from "express";
import mongoose from "mongoose";
import {
  loginValidation,
  registerValidation,
  postValidation,
} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";
import { url, port } from "./const.js";
import { login, register, getMe } from "./controllers/UserController.js";
import { createPost } from "./controllers/PostController.js";

const app = express();

app.use(express.json());

//Auth
app.post("/auth/login", loginValidation, login);
app.post("/auth/register", registerValidation, register);
app.get("/auth/me", checkAuth, getMe);

//Post
app.get("/posts");
app.get("/posts:id");
app.post("/posts", postValidation, createPost);
app.delete("/posts");
app.patch("/posts");

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
