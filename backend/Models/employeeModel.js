import mongoose, { Schema } from 'mongoose';
import Salary from "../Models/salaryModel.js";

const employeeSchema = new mongoose.Schema({
  emp_ID: {
    type: String,
    required:  'emp_ID is required !',
    validate: {
      validator: async function(value) {
        const employee = await mongoose.models.Employee.findOne({ emp_ID: value });
        return !employee || employee._id.equals(this._id);
      },
      message: props => `'${props.value}' is not available!`
    },
    required: [true, 'Emp-ID is required!']
  },
  emp_name: {
    type: String,
    required: 'Employee name is required !',
  },
  emp_contact: {
    type: Number,
    required: 'Employee Contact is required !',
  },
  emp_department: {
    type: String,
    required: 'Employee Department is required !',
  },
  salaries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Salary",
    },
  ],
});

employeeSchema.post("findOneAndDelete", async(employee)=>{
  if(employee){
    await Salary.deleteMany({_id: {$in: employee.salaries}});
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;