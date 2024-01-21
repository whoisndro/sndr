const express = require("express")
const router = express.Router()
const EmployeesController = require("../controllers/Employees")

router.get(
  "/:storeId/employees/:employeeId/edit",
  EmployeesController.getEmployeeById
)
router.post(
  "/:storeId/employees/:employeeId/edit",
  EmployeesController.updateEmployee
)

module.exports = router
