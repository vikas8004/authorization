import { createContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./component/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login.jsx";
import Signup from "./component/Signup.jsx";
import { contextApi } from "./utils/contex.jsx";
import Home from "./component/Home.jsx";
function App() {
  const [logIn, setLogIn] = useState(false);
  return (
    <>
      <contextApi.Provider value={{ logIn, setLogIn }}>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </contextApi.Provider>
    </>
  );
}

export default App;
