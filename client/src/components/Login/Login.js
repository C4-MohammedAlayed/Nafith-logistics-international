import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");

  const loginUser = async () => {
    console.log("hi out");
    const body = {
      email: email,
      password: password,
    };
   await axios
      .post("/login", body )
      .then((response) => {
        console.log("hi");
        if (response.data.role === "Admin") {
          navigate("/dashboard");
        } else {
          setmessage("Only admin can login");
        }
      })
      .catch((err) => {
        throw err
      });
  };

  return (
    <div className="main-continar">
      <div className="login-continar">
        <div className="login-register">
          <div className="inner">
            <span id="login">Login</span>
          </div>
        </div>
        <div className="login-box-out">
          <div className="login-box-inner">
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder=" Email "
              required=""
            />
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder=" Password"
              required=""
            />
            {message ? <p className="Error">{message}</p> : <></>}{" "}
            <div className="button-signIn">
              <button onClick={loginUser} id="signIn">
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="message"> </div>
      </div>
    </div>
  );
};

export default Login;
