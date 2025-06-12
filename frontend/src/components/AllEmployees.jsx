import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../components/UserContext";
import { BiEdit, BiMenu } from "react-icons/bi";

const AllEmployees = () => {
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

  const [employees, setEmployees] = useState([]);

  const handleShowEmployees = () => {
    axios
      .get("http://localhost:3000/employees")
      .then((response) => {
        setEmployees(response.data.data);
      })
      .catch((error) => {
        navigate("/");
      });
  };

  useEffect(() => {
    handleShowEmployees();
  }, []);

  let srlNo = 0;
  function sNo() {
    return (srlNo = srlNo + 1);
  }

  // for delete:
  const handleDeleteEmployee = (empId) => {
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
          .delete(`http://localhost:3000/employees/${empId}`)
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

  return (
    <>
      <div className="body col-10 offset-1 col-md-10 offset-md-1">
        <div className="d-flex justify-content-between">
        <td className="drop-down bg-secondary d-flex ms-auto">
                    <button
                      className="text-center dropdown-btn"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <BiEdit />
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          id="view-btn"
                          to={"/add"}
                        >
                          Add new employee
                        </Link>
                      </li>
                      <li>
                      <Link
                          className="dropdown-item"
                          id="edit-btn"
                          to={"/upload_employee_excel_file"}
                        >
                          Upload Employees details excel file
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                      <Link
                      className="dropdown-item"
                      id=""
                      to="/upload_salary_excel_file"
                    >
                      Upload salary excel file
                    </Link>
                      </li>
                    </ul>
                  </td>
        </div>
        <br />
        <div className="table-responsive">
        <table className="table table-light table-bordered table-hover table-responsive ">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Emp_ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Department</th>
              <th className="control-box">Controls</th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((employee) => (
                <tr>
                  <td>{sNo()}</td>
                  <td>{employee.emp_ID}</td>
                  <td>{employee.emp_name}</td>
                  <td>{employee.emp_contact}</td>
                  <td>{employee.emp_department}</td>
                  <td className="dropstart bg-secondary d-flex justify-content-center hover-pointer">
                    <i
                      className="text-center dropdown-btn"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <BiMenu />
                    </i>
                    <ul
                      className="dropdown-menu dropdown-menu-dark"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          id="view-btn"
                          to={`/detail/${employee._id}`}
                        >
                          View
                        </Link>
                      </li>
                      <li>
                      <Link
                          className="dropdown-item"
                          id="edit-btn"
                          to={`/edit/${employee._id}`}
                        >
                          Edit
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                      <Link
                      className="dropdown-item"
                      id="delete-btn"
                      onClick={() => {
                        handleDeleteEmployee(employee._id);
                      }}
                    >
                      Delete
                    </Link>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default AllEmployees;
