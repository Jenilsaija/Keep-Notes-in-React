import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function Signup(props) {
    const navigation=useNavigate();
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    });
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser",
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
        props.showAlert("User SignUp Sucessful","success");
    }else{
      props.showAlert(json.error,"warning");
    }
  }
  return (
    <div>
      <div
        className="m-2 bg-white container"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="m-2 fs-2 fw-bold">SignUp</div>
      </div>
      <div
        className="m-2 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        {" "}
        <div className="p-3">
          <form className="p-3" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
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
                minLength={5}
                required
              ></input>
            </div>
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </form>
          <div className="container">
            Alredy Have An Account ?{" "}
            <Link to="/login" className="link-danger">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
