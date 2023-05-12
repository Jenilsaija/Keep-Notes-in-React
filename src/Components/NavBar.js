import React from 'react'
import { Link, useLocation ,useNavigate} from 'react-router-dom';
export default function NavBar() {  
  let location =useLocation();
  const navigate=useNavigate()
  const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
    <div className="container-fluid" >
      <Link className="navbar-brand" to="/">Keep Notes</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item"> 
            <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
          </li>
        </ul>
        <form className='d-flex'>
      <button className={`btn btn-primary mx-2 ${localStorage.getItem('token')===null? "d-none":""}`} onClick={handlelogout}>Logout</button>
      <Link to="/login" className={`btn btn-light mx-2 ${localStorage.getItem('token')===null? "":"d-none"}`}>Login</Link>
      <Link to="/signup" className={`btn btn-primary mx-2 ${localStorage.getItem('token')===null? "":"d-none"}`}>Signup</Link>
    </form>
      </div>
    </div>
    
  </nav>
  </>
  )
}
  