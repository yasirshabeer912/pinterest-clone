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
import ProfilePage from "./pages/ProfilePage";
import Created from "./pages/Created";
const App = () => {
  const token = useSelector((state)=>state.auth.token)
  const email = useSelector((state) => state.auth.userDetails?.email);
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={token || email  ? <Posts/> : <Home/>} />
          {/* <Route path="/" element={<Posts />} /> */}
          <Route path="/pin/:id" element={<SinglePost />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/:name" element={<ProfilePage />} />
          <Route path="/:name/created" element={<Created />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
