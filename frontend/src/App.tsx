import React from "react";
import Container from "@mui/material/Container";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { FullPost } from "./pages/FullPost";
import { AddPost } from "./pages/AddPost/AddPost";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";

function App() {
  return (
    <Container maxWidth="lg">
      <HomePage />
      <FullPost />
      <AddPost />
      <Login />
      <Registration />
    </Container>
  );
}

export default App;
