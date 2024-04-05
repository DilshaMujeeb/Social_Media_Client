import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";


import { signUp, logIn } from '../../Actions/AuthAction'

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true)
const loading = useSelector((state) => state.authReducer.loading);
const dispatch = useDispatch();

  console.log("loading",loading);
  const [data, setaData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword:""
  });
  const [confirmpass,setConfirmpass] =useState(true)

  const handleChange = (e) => {
    setaData({...data,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
// logIn and signUp are the action in redux.. 
    if (isSignup) {
      console.log("data",data);
      data.password === data.confirmpassword ?
        dispatch(signUp(data)): setConfirmpass(false)
    }
    else {
      console.log("data in login", data)
      dispatch(logIn(data))
    }
  }
  const resetForm = () => {
    setConfirmpass(true);
    setaData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
    });
  }
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ReelKing</h1>
          <h6>EXplore the ideas throughout the world</h6>
        </div>
      </div>
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignup ? "Sign Up" : "Log In"}</h3>
          {isSignup && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="user name"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />

            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpassword"
                onChange={handleChange}
                value={data.confirmpassword}
              />
            )}
          </div>
          <span
            style={{
              display: confirmpass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm pass is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignup((prev) => !prev);
                resetForm();
              }}
            >
              {isSignup
                ? "Already have an account. Login"
                : "Dont have an account. Sign Up"}
            </span>
          </div>
          <button className="Button infoButton" type="submit" disabled={loading}>
            {loading?"Loading...":isSignup ? "Signup" : "LogIn"}
          </button>
        </form>
      </div>
      ;
    </div>
  );
}

 





export default Auth
