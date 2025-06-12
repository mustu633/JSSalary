import React from 'react'
import {  BiMenu, BiPaperPlane, BiUser } from "react-icons/bi";
import { useUser } from "../components/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const Navbar = () => {

  const { user, removeUser } = useUser();

  const navigate = useNavigate();

  const handleLogout = async () => {
    axios.get("http://localhost:3000/logout").then((response)=>{
        console.log(response);
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You are Logged out in successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        removeUser();
        navigate("/");
    }).catch((error)=>{
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Error in Logged out! try again!",
        });
      }
    });
};

  return (

    <>
  <nav className="navbar navbar-expand-md bg-body-light border-bottom shadow-sm">
    <div className="container-fluid">
      
      {/* Logo / Brand */}
      <a href="/" className="navbar-brand mb-2 d-flex align-items-center gap-2 ">
        <h4 className='mt-3 mt-md-3 mt-sm-1'> <i><BiPaperPlane /> </i> JS Salary</h4>
      </a>

      {/* Hamburger button for small screens */}
      <button
        className="navbar-toggler mt-0 mb-md-2 mb-sm-1"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-collapse"
        aria-controls="navbar-collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Nav Content */}
      <div className="collapse navbar-collapse bg-light px-3 px-md-0" id="navbar-collapse">
        
        {/* Left-aligned nav links */}
        <div className="navbar-nav">
          <a href="/" className="nav-link">Home</a>
          {user._id && (
            <a href="/employees" className="nav-link">Employees</a>
          )}
        </div>

        {/* Right-aligned nav: profile & dropdown */}
        <div className="navbar-nav ms-auto d-flex align-items-center gap-2">

          {user._id && (
            <span className="nav-link mx-2 profile">
              @{user.username} <i><BiUser /></i>
            </span>
          )}

          <div className="dropstart d-flex align-items-center">
            <button
              className="btn btn-outline-secondary"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="menu-icon"><BiMenu /></i>
            </button>

            {/* Dropdown Menu */}
            <ul className="dropdown-menu dropdown-menu-dark">
              {/* {user._id && ( */}
                <li>
                  <Link className="dropdown-item" id='edit-btn' to="/signup">Signup</Link>
                </li>
              {/* )} */}
              {!user._id && (
                <li>
                  <Link className="dropdown-item" id='edit-btn' to="/login">Login</Link>
                </li>
              )}
              {user._id && <li><hr className="dropdown-divider" /></li>}
              {user._id && (
                <li>
                  <Link className="dropdown-item" id='delete-btn' onClick={handleLogout}>Logout</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</>

)
}

export default Navbar;