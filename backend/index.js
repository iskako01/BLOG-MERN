import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import {
  loginValidation,
  registerValidation,
  postValidation,
} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { url, port } from "./const.js";
import { login, register, getMe } from "./controllers/UserController.js";
import {
  createPost,
  getAllPosts,
  getOnePost,
  removePost,
  updatePost,
} from "./controllers/PostController.js";

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
app.post("/auth/login", loginValidation, handleValidationErrors, login);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
app.get("/auth/me", handleValidationErrors, checkAuth, getMe);

//Upload image
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

//Post
app.get("/posts", getAllPosts);
app.get("/posts/:id", getOnePost);
app.post(
  "/posts",
  checkAuth,
  postValidation,
  handleValidationErrors,
  createPost
);
app.delete("/posts/:id", checkAuth, removePost);
app.patch("/posts/:id", checkAuth, handleValidationErrors, updatePost);

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
