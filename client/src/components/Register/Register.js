import React, { useState } from "react";
import axios from "axios";

import "./register.css";
const Register = ({ setUsers, setTotal }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const role_id = "2";

  const getAllUsers = async () => {
    
    await axios
      .get(`/users`)
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.users);
      })
      .catch((err) => {
        throw err;
      });
  };

  const createUser = async () => {
    await axios
      .post("/users", {
        userName,
        email,
        password,
        role_id,
      })
      .then(() => {
        getAllUsers();
      })
      .catch((err) => {
        setMessage(err.response.data.massage);
      });
  };
  return (
    <div className="login-continar">
      <div className="login-register"></div>
      <div className="login-box-out">
        <div className="register-box-inner">
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder=" Name "
            required=""
          />
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

          <div className="button-signIn">
            {" "}
            <button onClick={createUser} id="signIn">
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="message">
        {" "}
        {message ? <p className="ErrorMessage">{message}</p> : <></>}{" "}
      </div>
    </div>
  );
};
export default Register;
