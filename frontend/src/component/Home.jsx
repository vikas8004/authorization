import React, { useContext, useEffect } from "react";
import { baseUrl } from "../utils/constants.jsx";
import { contextApi } from "../utils/contex.jsx";
import axios from "axios";
const Home = () => {
  const { logIn, setLogIn } = useContext(contextApi);
  window.onload = async () => {
    // alert("refreshed")
    try {
      const res = await axios.get(`${baseUrl}/api/v1/verify-user`, {
        withCredentials: true,
      });
      if (res.data) {
        // console.log(res.data.data);
        if (res.data.data.status) {
          setLogIn(true);
        } else {
          setLogIn(false);
        }
      }
    } catch (error) {
      setLogIn(false);
    }
  };
  return <div>Home</div>;
};

export default Home;
