import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import app from "../../config/firebase";
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
const Login = () => {
  let auth=getAuth()
  const navigation = useNavigate();
  var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var passwformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/


  let [Getemail, Setemail] = useState("");
  let [Getpassword, Setpassword] = useState("");
  let [GetInputMessage, SetInputMessage] = useState("");
  let [GetMessageType, SetMessageType] = useState("");

  let login = () => {
    if (Getemail !== "Master@gmail.com") {
      SetInputMessage("please enter email address !");
      SetMessageType("error")

     } else if (Getpassword !== "MainMaster") {
      SetInputMessage("please enter password !");
      SetMessageType("error")

    }  else {
           navigation("/allusers")
    }
   
  };
  return (
    <div id="Login_returndiv">
      <div id="Login_Maindiv">
        <h1 id="Login_mainHeading">Log In</h1>
        <div id="Login_inputsDIv">
          <h1 className="Login_InputsHeading">Email Address</h1>
          <input
            type="email"
            name="Email Address"
            id="Login_Email"
            className="Login_Inputs"
            placeholder="Enter email address"
            value={Getemail}
            onChange={(e) => Setemail(e.target.value)}
          />
          <h1 className="Login_InputsHeading">Password</h1>
          <input
            type="password"
            name="Password"
            id="Login_Password"
            className="Login_Inputs"
            placeholder="Enter password"
            value={Getpassword}
            onChange={(e) => Setpassword(e.target.value)}
          />
          <p id="Login_ForgotPass">Forgot Password</p>
          <p
            id={GetInputMessage === "" ? "Login_NullMessage" : "Login_Message"}
            style={{color:GetMessageType==="error"?"red":"green"}}
          >
            {GetInputMessage}
          </p>

          <button id="Login_button" onClick={login}>
            Log In
          </button>
        </div>
       
      </div>
    </div>
  );
};
export default Login;
