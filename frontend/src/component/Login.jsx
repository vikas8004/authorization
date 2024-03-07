import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constants.jsx";
import axios from "axios";
import { contextApi } from "../utils/contex.jsx";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { logIn, setLogIn } = useContext(contextApi);
  // console.log(logIn);
  const updateValues = (e) => {
    setValues((preval) => {
      return { ...preval, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(values);
      setValues({
        email: "",
        password: "",
      });
      const res = await axios.post(`${baseUrl}/api/v1/login-user`, values, {
        withCredentials: true,
      });
      if (res) {
        // console.log(res.data);
        setLogIn(true)
        alert(res.data.data.message);
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form>
        <input
          name="email"
          value={values.email}
          onChange={(e) => updateValues(e)}
          type="email"
          placeholder="enter email"
          required
        />
        <input
          name="password"
          value={values.password}
          onChange={(e) => updateValues(e)}
          type="password"
          required
          placeholder="enter password"
        />
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
