import React, { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


const SalaryExcelUpload = () => {
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
      console.log(monthAndYear)
    },[])

  const [file, setFile] = useState(null);
  const [monthAndYear, setMonthAndYear] = useState("");

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});


  const handleUploadSalaryfile = async () => {
    if (!file) {
      return setErrors({message: "Please Select file!"})
   };
   if(monthAndYear === ""){
    return setErrors({message: "Please select Month and year!"})
   }
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`http://localhost:3000/upload_salary_excel/${monthAndYear}`, formData)
    .then((response) => {
      if(response){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Salary details uploaded successfully!",
          showConfirmButton: false,
          timer: 1000,
        })
      }
      setUploading(false);
      setErrors({});
      navigate("/upload_salary_excel_file")
    })
    .catch((error) => {
      console.log(error)
      if(error){
        Swal.fire({
          icon: "error",
          title: "Error detected in Uploading Salary file!"
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
          <h4 className="form-heading text-center">Upload the Excel file of salary of this month : </h4>
          <hr />
          <div className="form-inline d-flex">
            <input
              className="form-control mx-3 my-3"
              type="file"
              accept=".xlsx, .xls" 
              onChange={e => {setErrors({}), setFile(e.target.files[0])}}
            />
            <input
              className="form-control mx-3 my-3"
              type="month"
              onChange={e => {setErrors({}), setMonthAndYear(e.target.value)}}
            />
            <button onClick={handleUploadSalaryfile} className="btn btn-outline-success mx-3 my-3">
              Upload
            </button>
          </div>
          {uploading && <p className="processingMsg">Uploading file... ⏳</p>}
      {errors.message && <p className="errMsg">{errors.message}</p>}
        </div>
      </div>
    </>
  );
};

export default SalaryExcelUpload;
