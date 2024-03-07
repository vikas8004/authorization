import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/constants.jsx";
const Signup = () => {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const updateValues = (e) => {
    setValues((preval) => {
      return { ...preval, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseUrl}/api/v1/register-user`, values);
      console.log(res.data);
      console.log(values);
      setValues({
        userName: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form>
        <input
          onChange={(e) => updateValues(e)}
          name="userName"
          value={values.userName}
          required
          placeholder="enter username"
        />
        <input
          name="email"
          value={values.email}
          onChange={(e) => updateValues(e)}
          type="email"
          required
          placeholder="enter email"
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

export default Signup;
