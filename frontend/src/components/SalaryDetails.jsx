import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {BiCheck} from "react-icons/bi";

const SalaryDetails = () => {
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

  let srlNo = 0;
  function sNo() {
    return (srlNo = srlNo + 1);
  }

  return (
    <>
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card h-100">
              <div className="card-body">
                <h4>Employee Detail :</h4>
                <hr />
                <p>
                  <strong>Emp-ID : </strong>
                  {employee.emp_ID}
                </p>
                <p>
                  <strong>Name : </strong>
                  {employee.emp_name}
                </p>
                <p>
                  <strong>Contact : </strong>
                  {employee.emp_contact}
                </p>
                <p>
                  <strong>Department : </strong>
                  {employee.emp_department}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
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
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employee.salaries
                        .filter((salary) => salary.month_year === params.month_year)
                        .map((salary) => (
                          <tr key={salary._id}>
                            <th scope="row">{sNo()}</th>
                            <td>{salary.month_year}</td>
                            <td>{salary.ref_no}</td>
                            <td>
                              &#8360; {salary.amount.toLocaleString("en-PK")}
                            </td>
                            <td>{salary.xpin}</td>
                            <td>{salary.bank_name}</td>
                            <td>{salary.transfer_method}</td>
                            <td className="text-success">Paid <BiCheck/></td>
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

export default SalaryDetails;
