import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";



const Login=()=>{
    const navigate =useNavigate()
const [email,setEmail]=useState("")
const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");

  const loginUser=()=>{
      axios.post("http://localhost:5000/login",{email,password})
      .then((response)=>{
        localStorage.setItem("myIsLoggedIn", true); //
        localStorage.setItem("MyuserRole", response.data.role)
        navigate("/Home")
      })
      .catch((err)=>{
        setmessage(err.response.data.message);
      })
  }
}

export default Login;