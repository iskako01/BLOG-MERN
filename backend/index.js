import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import {
  loginValidation,
  registerValidation,
  postValidation,
} from "./validations/validations.js";

import { url, port } from "./const.js";

const app = express();

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Auth
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", handleValidationErrors, checkAuth, UserController.getMe);

//Upload image
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

//Post
app.get("/posts", PostController.getAllPosts);
app.get("/posts/:id", PostController.getOnePost);
app.post(
  "/posts",
  checkAuth,
  postValidation,
  handleValidationErrors,
  PostController.createPost
);
app.delete("/posts/:id", checkAuth, PostController.removePost);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationErrors,
  PostController.updatePost
);

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
