import React, { FC, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components for each page/route
import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/signup";
import Home from "./pages/home/home";
import Navbar from "./components/navbar/navbar";
import TopPlayers from "./pages/top/top-players";

const App: FC = () => {
  const [isLoggedIn, setisLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            path="login"
            element={<LoginPage setisLoggedIn={setisLoggedIn} />}
          />
          <Route
            path="signup"
            element={<SignupPage setisLoggedIn={setisLoggedIn} />}
          />
          <Route path="/top-players" element={<TopPlayers />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
