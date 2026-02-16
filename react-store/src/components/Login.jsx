import React from "react";
// import api from "./services/api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/Authcontext.jsx";
import api from "../services/api.js";

function Login() {
 
const {login} = useAuth()

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/users/login", form)
      console.log(data);
      console.log(data.message);
      alert(data.message);
      login(data)
      data.user.role === 'user'? navigate("/products") 
      :data.user.role === 'Admin' ? navigate('/profile')
      :data.user.role === 'trader' ? navigate('/home')
      :navigate('/login')
    
     
      return data
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>this is the login page</h1>

      <div className="container mt-5">
        <form id="loginForm" onSubmit={onSubmit}>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="Email"
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
              }}
              className="form-conrtol"
              placeholder="Email Address"
            />
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="Password"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
              className="form-conrtol"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4">
            login
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
