// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import "./App.css";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import { useSelector } from "react-redux";
const App = () => {
  const token = useSelector((state)=>state.auth.token)
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={token ? <Posts/> : <Home/>} />
          {/* <Route path="/" element={<Posts />} /> */}
          <Route path="/posts/postname" element={<SinglePost />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
