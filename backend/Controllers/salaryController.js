import { ObjectId } from "mongodb";
import Employee from "../Models/employeeModel.js";
import Salary from "../Models/salaryModel.js";
import XLSX from "xlsx";

export default {
  // for uploading whole excel file of salary:
  async uploadSalaryExcel(req, res) {
    const { month_year } = req.params;
    if (!req.files || !req.files.file)
      return res.status(400).json({ message: "No file uploaded!" });

    const file = req.files.file;
    const workbook = XLSX.read(file.data, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    try {
      for (const row of data) {
        const { emp_ID, ref_no, amount, xpin, bank_name, transfer_method } =
          row;

        let employee = await Employee.findOne({ emp_ID });
        if (!employee) {
          return res.status(400).json({
            message: `Employee ID "${emp_ID}" is incorrect! or Employee is not found!`,
          });
        }

        for (const salary of employee.salaries) {
          const salaryId = salary._id;
          const existingSalary = await Salary.findById(salaryId);
          if (existingSalary.month_year === month_year) {
            await Employee.findByIdAndUpdate(employee._id, { $pull: { salaries: existingSalary._id } });
            await Salary.findByIdAndDelete(existingSalary._id);
          }
        }
        const salary = await Salary({
          month_year,
          emp_ID,
          ref_no,
          amount,
          xpin,
          bank_name,
          transfer_method,
        });
        employee.salaries.push(salary);
        await employee.save();
        await salary.save();
      }

      return res
        .status(201)
        .json({ message: "Data uploaded and saved successfully!" });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Some salary data are missing or incorrect!" });
      }
      return res.status(500).json({ message: "Server Error!" });
    }
  },

  // for creating new salary:
  async createSalary(req, res) {
    const { id, emp_ID } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const { month_year, ref_no, amount, xpin, bank_name, transfer_method } =
      req.body;

    try {
      const employee = await Employee.findById(id);

      for (const salary of employee.salaries) {
        const salaryId = salary._id;
        const existingSalary = await Salary.findById(salaryId);
        if (existingSalary.month_year === month_year) {
          await Employee.findByIdAndUpdate(employee._id, { $pull: { salaries: existingSalary._id } });
          await Salary.findByIdAndDelete(existingSalary._id);
        }
      }

      const newSalary = await Salary({
        month_year,
        emp_ID,
        ref_no,
        amount,
        xpin,
        bank_name,
        transfer_method,
      });

      employee.salaries.push(newSalary);

      await newSalary.save();
      await employee.save();

      return res.status(201).json(newSalary);
    } catch (error) {
      console.log(error)
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

  //   // For deleting salary:
  async deleteSalary(req, res) {
    const { id, salaryId } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Your employee id is invalid!" });
    }
    if (!ObjectId.isValid(salaryId)) {
      res.status(400).json({ message: "Your salary id is invalid!" });
    }

    try {
      await Employee.findByIdAndUpdate(id, { $pull: { salaries: salaryId } });
      await Salary.findByIdAndDelete(salaryId);
      return res.status(200).json({ message: "Salary deleted successfully!" });
    } catch (error) {
      console.log("error in deleting Salary: ", error);
    }
  },
};
