import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
function Login(props) {
    const navigation=useNavigate();
    const [data,setData]=useState({
        email:"",
        password:""
    });
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
    );
    const json= await response.json();
    if(json.success){
        //save token and redirect
        localStorage.setItem('token',json.authtoken);
        navigation('/')
        props.showAlert("Login Sucessful","success");
    }else{
        props.showAlert(json.error,"warning");
    }
  }
  return (
    <>
      <div
        className="m-2 bg-white container"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="m-1 fs-2 fw-bold">Login</div>
      </div>
      <div
        className="m-2 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        {" "}
        <div className="p-2">
          <form className="p-3" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={data.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="Password"
                name="password"
                onChange={onChange}
                className="form-control"
                id="password"
                value={data.password}
                minLength={5}
                required
              ></input>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <div className="container">
            Don't Have Account ? <Link to="/signup" className="link-danger">SignUp</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
