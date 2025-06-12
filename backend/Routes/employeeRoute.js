import Router from 'express';
import employeeController from '../Controllers/employeeController.js';
import  userVerification from '../Middlewares/userMiddleware.js';


const router = Router();

// Routes for Employee:

router.get('/employees', userVerification, employeeController.showEmployees);
router.post('/employees', userVerification, employeeController.createEmployee);
router.get('/employees/:id', employeeController.showEmployee);
router.put('/employees/:id', userVerification, employeeController.updateEmployee);
router.delete('/employees/:id', userVerification, employeeController.deleteEmployee);
router.post('/employee/salary_details', employeeController.employeeSalaryDetails);
router.post("/upload_employee_excel", userVerification, employeeController.uploadEmployeeExcel);

export default router;