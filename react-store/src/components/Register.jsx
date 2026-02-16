import React from "react";
import { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
function Register() {
  const navigate = useNavigate();

  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/users/createuser", form);
      console.log(data);
      console.log(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Register Here</h1>
      <Button onClick={()=>navigate("/login")}>go to login</Button>
      <div className="container mt-5">
        <form id="registerForm" onSubmit={onSubmit}>
          <div className="form-outline mb-4">
            <input
              type="text"
              onChange={(e) => {
                setform({ ...form, username: e.target.value });
              }}
              id="userName"
              className="form-conrtol"
              placeholder="userName"
            />
          </div>
          <div className="form-outline mb-4">
            <input
              type="email"
              onChange={(e) => {
                setform({ ...form, email: e.target.value });
              }}
              id="Email"
              className="form-conrtol"
              placeholder="Email Address"
            />
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              onChange={(e) => {
                setform({ ...form, password: e.target.value });
              }}
              id="Password"
              className="form-conrtol"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Rigester
          </button>
        </form>
      </div>
      
    </>
  );
}
export default Register;
