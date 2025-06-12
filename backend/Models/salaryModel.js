import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  month_year: {
    type: String,
    required: "Month and year is required !"
  },
  emp_ID: {
    type: String,
    required: "emp_ID is required !"
  },
  ref_no: {
    type: String,
    required: "Reference NO. is required !"
  },
  amount: {
    type: Number,
    required: 'Amount is required !',
  },
  xpin: {
    type: String,
    required: 'XPIN is required !',
  },
  bank_name: {
    type: String,
    required: 'Bank Name is required !',
  },
  transfer_method: {
    type: String,
    required: 'Transfer method is required !',
  },
});

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;