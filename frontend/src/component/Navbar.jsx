import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { contextApi } from "../utils/contex.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/constants.jsx";
const Navbar = () => {
  const { logIn, setLogIn } = useContext(contextApi);
  const navigate = useNavigate();
  const clickHandler = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/v1/logout-user`, {
        withCredentials: true,
      });
      if (res) {
        console.log(res.data);
        if (res.data.data.status) {
          setLogIn(false);
        } else {
          setLogIn(true);
        }
      }
    } catch (error) {
      setLogIn(true);
    }
  };
  return (
    <div
      style={{
        width: "80vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0px auto",
      }}
    >
      <h1>Navbar</h1>
      <ul style={{ display: "flex", gap: "10px", listStyle: "none" }}>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        {logIn ? (
          <li>
            <button
              style={{ width: "100px", cursor: "pointer" }}
              onClick={clickHandler}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            {" "}
            <li>
              <NavLink to={"/login"}>LogIn</NavLink>
            </li>
            <li>
              <NavLink to={"/signup"}>SignUp</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
