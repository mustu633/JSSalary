import React, { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


const EmployeeExcelUpload = () => {
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

  const [file, setFile] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});


  const handleUploadEmployeefile = async () => {
    if (!file) {
       return setErrors({message: "Please Select file!"})
    };
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3000/upload_employee_excel', formData)
    .then((response) => {
      if(response){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Employee details uploaded successfully!",
          showConfirmButton: false,
          timer: 1000,
        })
      }
      setUploading(false);
      setErrors({});
      navigate("/upload_employee_excel_file")
    })
    .catch((error) => {
      if(error){
        Swal.fire({
          icon: "error",
          title: "Error detected in Uploading Employee file!"
        })
      }
      if (
        error.response &&
        error.response.data
      ) {
      setErrors(error.response.data)
      } else {
        console.error("Error uploading :", error);
      }
        setUploading(false);
    })
}



  return (
    <>
      <div className="body d-flex">
        <div className="col-6 offset-3 my-auto">
          <h4 className="form-heading text-center mb-3">Upload the Excel file of Employees details : </h4>
          <hr />
          <div className="form-inline d-flex">
            <input
              className="form-control my-3 mr-sm-3"
              type="file"
              accept=".xlsx, .xls" 
              onChange={e => {setErrors({}), setFile(e.target.files[0])}}
            />
            <button onClick={handleUploadEmployeefile} className="btn btn-outline-success mx-3 my-3">
              Upload
            </button>
          </div>
          {uploading && <p className="processingMsg">Uploading file... ⏳</p>}
      {/* {message && <p className="errMsg">{message}</p>} */}
      {errors.message && <p className="errMsg">{errors.message}</p>}
        </div>
      </div>
    </>
  );
};

export default EmployeeExcelUpload;
