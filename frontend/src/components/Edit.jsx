import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const Edit = () => {

  const { user } = useUser();

  const navigate = useNavigate();

  const checkUser = () => {
    if(!user._id){
      navigate("/")
    }
    else{
      return;
    }
  }
  useEffect(() => {
    checkUser();
  },[])

  const params = useParams();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    emp_ID: "",
    emp_name: "",
    emp_contact: "",
    emp_department: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employees/${params.id}`)
      .then((response) => {
        const { emp_ID, emp_name, emp_contact, emp_department } =
          response.data.data;
        setFormData({
          emp_ID,
          emp_name,
          emp_contact,
          emp_department,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEditEmployee = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("emp_ID", formData.emp_ID);
    data.append("emp_name", formData.emp_name);
    data.append("emp_contact", formData.emp_contact);
    data.append("emp_department", formData.emp_department);

    console.log(formData)

    axios
      .put(`http://localhost:3000/employees/${params.id}`, data)
      .then((response) => {
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Employee updated successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        setErrors({});
      })
      .catch((error) => {
        console.log(error)
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error detected in updating Employee!",
          });
        }
        if (error.response?.data?.errors) {
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.path] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          console.error("Error editing Employee:", error);
        }
      });
  };

  return (
    <>
    <div className="body col-8 offset-2">
        <div className="card">
        <h4 className="heading text-center mt-3 mb-3">Edit employee</h4>
          <hr />
          <form onSubmit={handleEditEmployee}>
            <div>
            <label className="col-sm-2 col-form-label font-weight-bold" htmlFor="emp_ID" >Emp-ID :</label>
              <input
                type="text"
                id="emp_ID"
                placeholder="Enter Emp-ID"
                defaultValue={formData.emp_ID}
                onChange={handleChange}
                className="form-control"
              ></input>
              {errors.emp_ID && <p className="errMsg">{errors.emp_ID}</p>}
            </div>
            <div>
            <label className="col-sm-2 col-form-label font-weight-bold" htmlFor="emp_name" >Name :</label>
              <input
                type="text"
                id="emp_name"
                placeholder="Enter Employee name"
                defaultValue={formData.emp_name}
                onChange={handleChange}
                className="form-control"
              ></input>
              {errors.emp_name && <p className="errMsg">{errors.emp_name}</p>}
            </div>
            <div>
            <label className="col-sm-2 col-form-label font-weight-bold" htmlFor="emp_contact" >Contact :</label>
              <input
                type="text"
                id="emp_contact"
                placeholder="Enter Employee Contact No."
                defaultValue={formData.emp_contact}
                onChange={handleChange}
                className="form-control"
              ></input>
              {errors.emp_contact && <p className="errMsg">{errors.emp_contact}</p>}
            </div>
            <div>
                <label className="col-sm-2 col-form-label font-weight-bold" htmlFor="emp_ID" >Emp-ID :</label>
              <input
                type="text"
                id="emp_department"
                placeholder="Enter Employee department"
                defaultValue={formData.emp_department}
                onChange={handleChange}
                className="form-control"
              ></input>
              {errors.emp_department && <p className="errMsg">{errors.emp_department}</p>}
            </div>
            <br />
            <button className="btn btn-success text-center">Update</button>
          </form>
        </div>
        </div>
    </>
  );
};

export default Edit;
