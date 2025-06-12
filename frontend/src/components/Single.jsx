import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../components/UserContext";
import {
  BiMenu,
  BiSolidTrash,
} from "react-icons/bi";

const Single = () => {
  const { user } = useUser();

  const checkUser = () => {
    if (!user._id) {
      navigate("/");
    } else {
      return;
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const params = useParams();

  const [employee, setEmployee] = useState({
    emp_ID: "",
    emp_name: "",
    emp_contact: "",
    emp_department: "",
    salaries: [],
  });

  const handleShowEmployee = () => {
    axios
      .get(`http://localhost:3000/employees/${params.id}`)
      .then((response) => {
        setEmployee(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleShowEmployee();
  }, []);

  // for delete employee:
  const handleDeleteEmployee = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3058d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/employees/${employee._id}`)
          .then((response) => {
            if (response) {
              Swal.fire({
                position: "center",
                icon: "delete",
                title: "Employee deleted successfully!",
                showConfirmButton: true,
              });
            }
            navigate("/employees");
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Failed to delete please try again later!",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  // for salary :
  const [formData, setFormData] = useState({
    month_year: "",
    ref_no: "",
    amount: "",
    xpin: "",
    bank_name: "",
    transfer_method: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCreateSalary = async (e) => {
    console.log(formData.month_year)
    e.preventDefault();
    const data = new FormData();

    data.append("month_year", formData.month_year);
    data.append("ref_no", formData.ref_no);
    data.append("amount", formData.amount);
    data.append("xpin", formData.xpin);
    data.append("bank_name", formData.bank_name);
    data.append("transfer_method", formData.transfer_method);

    axios
      .post(`http://localhost:3000/employees/${employee._id}/salaries/${employee.emp_ID}`, data)
      .then((response) => {
        if (response) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Salary added successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        setErrors({});
        navigate(`/detail/${employee._id}`);
      })
      .catch((error) => {
        console.log(error)
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Error detected in reating salary!",
          });
        }
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          if (error.response.errors) {
            Swal.fire({
              icon: "error",
              title: "Error detected in creating salary!",
            });
          }
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            backendErrors[err.path] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          console.error("Error creating salary:", error);
        }
      });
  };

  const handleDeleteSalary = (salaryId) => {
    axios
      .delete(
        `http://localhost:3000/employees/${employee._id}/salaries/${salaryId}`
      )
      .then((response) => {
        if (response) {
          Swal.fire({
            position: "center",
            icon: "delete",
            title: "Salary deleted successfully!",
            showConfirmButton: true,
          });
        }
        navigate(`/detail/${employee._id}`);
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          title: "Error",
          text: "Failed to delete please try again later!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  let srlNo = 0;
  function sNo() {
    return (srlNo = srlNo + 1);
  }

  return (
    
    <>
  <div className="container my-4">
    <div className="row justify-content-center">
      <div className="col-12 col-md-8">
        <div className="card">
          <div className="card-body">
            <h4>Employee Detail :</h4>
            <hr />
            <p><strong>Emp-ID : </strong>{employee.emp_ID}</p>
            <p><strong>Name : </strong>{employee.emp_name}</p>
            <p><strong>Contact : </strong>{employee.emp_contact}</p>
            <p><strong>Department : </strong>{employee.emp_department}</p>
            <hr />
            <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
              <Link className="btn btn-secondary" id="edit-btn" to={`/edit/${employee._id}`}>Edit</Link>
              <button className="btn btn-danger" id="delete-btn" onClick={handleDeleteEmployee}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="container mb-4">
    <div className="row justify-content-center">
      <div className="col-12 col-md-8">
        <div className="card">
          <div className="card-body">
            <h4>Add Salary Details :</h4>
            <hr />
            <form onSubmit={handleCreateSalary}>
              {/* input for month and year: */}
              <div className="mb-3">
                <label htmlFor="ref_no" className="form-label">Month and Year :</label>
                <input type="month" name="month_year" id="month_year" className="form-control" onChange={handleChange} />
                {errors.month_year && <p className="errMsg">{errors.month_year}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="ref_no" className="form-label">Ref No. :</label>
                <input type="text" name="ref_no" id="ref_no" className="form-control" onChange={handleChange} />
                {errors.ref_no && <p className="errMsg">{errors.ref_no}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount :</label>
                <input type="number" name="amount" id="amount" className="form-control" onChange={handleChange} />
                {errors.amount && <p className="errMsg">{errors.amount}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="xpin" className="form-label">XPIN :</label>
                <input type="text" name="xpin" id="xpin" className="form-control" onChange={handleChange} />
                {errors.xpin && <p className="errMsg">{errors.xpin}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="bank_name" className="form-label">Bank name :</label>
                <input type="text" name="bank_name" id="bank_name" className="form-control" onChange={handleChange} />
                {errors.bank_name && <p className="errMsg">{errors.bank_name}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="transfer_method" className="form-label">Transfer method :</label>
                <select
                  id="transfer_method"
                  name="transfer_method"
                  className="form-control"
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="By CNIC">By CNIC</option>
                </select>
                {errors.transfer_method && <p className="errMsg">{errors.transfer_method}</p>}
              </div>
              <button className="btn btn-success mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="container mb-5">
    <div className="row justify-content-center">
      <div className="col-12 col-md-10">
        <div className="card">
          <div className="card-body">
            <h4>Salaries Details :</h4>
            <hr />
            <div className="table-responsive">
              <table className="table table-sm table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Month-Year</th>
                    <th scope="col">Ref No</th>
                    <th scope="col">Amount</th>
                    <th scope="col">XPIN</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Transfer Method</th>
                    <th scope="col"><i><BiMenu /></i></th>
                  </tr>
                </thead>
                <tbody>
                  {employee.salaries.map((salary) => (
                    <tr key={salary._id}>
                      <th scope="row">{sNo()}</th>
                      <td>{salary.month_year}</td>
                      <td>{salary.ref_no}</td>
                      <td>&#8360; {salary.amount.toLocaleString("en-PK")}</td>
                      <td>{salary.xpin}</td>
                      <td>{salary.bank_name}</td>
                      <td>{salary.transfer_method}</td>
                      <td>
                        <i className="dlt-btn text-danger" onClick={() => handleDeleteSalary(salary._id)}>
                          <BiSolidTrash />
                        </i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default Single;
