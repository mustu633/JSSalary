import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    emp_ID: "",
  });
  const [monthAndYear, setMonthAndYear] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSalaryDetails = (e) => {
    e.preventDefault();
    console.log(formData);
    const data = new FormData();

    data.append("emp_ID", formData.emp_ID);

    axios
      .post(`http://localhost:3000/employee/salary_details`, data)
      .then((response) => {
        navigate(`/salary_details/${response.data.data._id}/${monthAndYear}`);
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Invalid Emp-ID !",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          if (error.response.errors) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Invalid Emp-ID !",
              showConfirmButton: false,
              timer: 1000,
            });
          }
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.path] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          console.error("Error submitting form:", error);
        }
      });
  };

  return (
    <div className="body d-flex">
      <div className="col-6 offset-3 my-auto">
          <h4 className="form-heading text-center">Enter your Emp-ID : </h4>
          <hr />
          <form className="form-inline d-flex flex-column" onSubmit={handleSalaryDetails} >
            <div className="d-flex">
            <input
              className="form-control mx-3 my-3 text-center"
              type="search"
              placeholder="Emp-ID"
              aria-label="Search"
              onChange={handleChange}
              id="emp_ID"
            />
            <input
              className="form-control mx-3 my-3 text-center"
              type="month"
              onChange={e => {setErrors({}), setMonthAndYear(e.target.value)}}
              id="emp_ID"
            />
            </div>
            <button className="btn btn-outline-success mx-3 my-3 ms-auto" type="submit">
              Search
            </button>
          </form>
          {errors.emp_ID && <p className="text-center errMsg">{errors.emp_ID}</p>}
      </div>
    </div>
  );
};

export default Home;
