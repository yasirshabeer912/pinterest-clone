// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import "./App.css";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/postname" element={<SinglePost />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
