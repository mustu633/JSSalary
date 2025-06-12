import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../src/public/css/App.css";
import Home from "./components/Home";
import Navbar from "./includes/Navbar";
import Footer from "./includes/Footer";
import Single from "./components/Single";
import Edit from "./components/Edit";
import Add from "./components/Add";
import AllEmployees from "./components/AllEmployees";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SalaryDetails from "./components/SalaryDetails";
import SalaryExcelUpload from "./components/SalaryExcelUpload";
import EmployeeExcelUpload from "./components/EmployeeExcelUpload";


const App = () => {
  return (
      <Router>
        < Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<AllEmployees />}/>
          <Route path="/add" element={<Add />} />
          <Route path="/detail/:id" element={<Single />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/salary_details/:id/:month_year" element={<SalaryDetails />} />
          <Route path="/upload_salary_excel_file" element={<SalaryExcelUpload />} />
          <Route path="/upload_employee_excel_file" element={<EmployeeExcelUpload />} />
        </Routes>
        < Footer />
      </Router>
  );
};

export default App;
