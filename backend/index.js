const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

const url = process.env.DB_URL;
const port = process.env.PORT;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
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
