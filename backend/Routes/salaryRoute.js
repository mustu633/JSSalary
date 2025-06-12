import Router from 'express';
import salaryController from '../Controllers/salaryController.js';
import userVerification from '../Middlewares/userMiddleware.js';

const router = Router()


// Routes for Salary:
router.post("/employees/:id/salaries/:emp_ID", userVerification, salaryController.createSalary);
router.delete("/employees/:id/salaries/:salaryId", userVerification, salaryController.deleteSalary);
router.post("/upload_salary_excel/:month_year", userVerification, salaryController.uploadSalaryExcel);

export default router;