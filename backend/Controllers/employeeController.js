import { ObjectId } from "bson";
import Employee from "../Models/employeeModel.js";
import XLSX from "xlsx";

export default {
  // for uploading whole excel file of salary:
  async uploadEmployeeExcel(req, res) {
    if (!req.files || !req.files.file)
    return res.status(400).json({ message: "No file uploaded!"});

    const file = req.files.file;
    const workbook = XLSX.read(file.data, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    try {
      for (const row of data) {
        const { emp_ID, emp_name, emp_contact, emp_department } = row;

        let employee = await Employee.findOne({ emp_ID });
        if (!employee) {
          const newEmployee = await Employee({
            emp_ID,
            emp_name,
            emp_contact,
            emp_department,
          });
          await newEmployee.save();
        }
      }
      return res.status(201).json({ message: "Data uploaded and saved successfully!" });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({message : "Some employee data are missing or incorrect!"});
      }
      return res.status(500).json({message : "Server Error!"});
    }
  },

  // For create new employee:
  async createEmployee(req, res) {
    const { emp_ID, emp_name, emp_contact, emp_department } = req.body;
    try {
      const newEmployee = new Employee({
        emp_ID,
        emp_name,
        emp_contact,
        emp_department,
      });
      await newEmployee.save();
      return res.status(201).json(newEmployee);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => ({
          msg: err.message,
          path: err.path,
        }));

        return res.status(400).json({ errors });
      }
      return res.status(500).json({ errors: [{ msg: error.message }] });

    }
  },

  // For Show all Employee:
  async showEmployees(req, res) {
    const employees = await Employee.find({});
    return res.json({ data: employees });
  },

  //For Show single employee by id:
  async showEmployee(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }
    const employee = await Employee.findById(id).populate("salaries").exec();
    if (!employee) {
      return res.status(404).json({ message: "Employee is not found!" });
    }
    return res.status(200).json({ data: employee });
  },

  //     //For Update the existing Listing:

  async updateEmployee(req, res) {
    const { id } = req.params;

    const { emp_ID, emp_name, emp_contact, emp_department } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    try {
      const existingEmployee = await Employee.findById(id);

      if (!existingEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      existingEmployee.emp_ID = emp_ID;
      existingEmployee.emp_name = emp_name;
      existingEmployee.emp_contact = emp_contact;
      existingEmployee.emp_department = emp_department;

      await existingEmployee.save();

      return res
        .status(200)
        .json({ message: "Employee updated successfully!" });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => ({
          msg: err.message,
          path: err.path,
        }));

        return res.status(400).json({ errors });
      }
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  },

  //     //For Delete the existing Listing:
  async deleteEmployee(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Your Employee id is invalid!" });
    }

    try {
      const employee = await Employee.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Employee deleted successfully!" });
    } catch (error) {
      console.log("error in deleting Employee: ", error);
    }
  },

  //For Show single employee by emp_ID:
  async employeeSalaryDetails(req, res) {
    const { emp_ID } = req.body;
    const employee = await Employee.findOne({ emp_ID })
      .populate("salaries")
      .exec();
    if (!employee) {
      return res
        .status(404)
        .json({
          errors: [{ msg: "Invalid Emp-ID! Try again!", path: "emp_ID" }],
        });
    }
    return res.status(200).json({ data: employee });
  },
};
