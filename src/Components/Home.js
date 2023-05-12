import React, { useEffect } from "react";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
import Addnote from "./Addnote";
function Home(props) {
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')===null){
      navigate('/login');
    }
    // eslint-disable-next-line
  },[])
  return (

    <>
      <Addnote showAlert={props.showAlert}/>
      <Notes showAlert={props.showAlert}/>
    </>
  );
}

export default Home;
