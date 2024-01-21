const { Employees } = require("../models")
const { calculateAge, formatSalaryToRupiah } = require("../helpers/employees")

const getEmployeeById = async (req, res) => {
  const { storeId, employeeId } = req.params

  try {
    const employee = await Employees.findByPk(employeeId)

    if (!employee || employee.storeId != storeId) {
      return res.status(404).json({ error: "Employee not found" })
    }

    const formattedEmployee = {
      ...employee.dataValues,
      salary: formatSalaryToRupiah(employee.salary),
      dateOfBirth: calculateAge(employee.dateOfBirth),
    }

    console.log("ccc", formattedEmployee)

    res.render("edit-employees", { employee: formattedEmployee })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
}

const updateEmployee = async (req, res) => {
  const { storeId, employeeId } = req.params
  const { firstName, lastName, dateOfBirth, education, position, salary } =
    req.body

  try {
    const employee = await Employees.findByPk(employeeId)

    if (!employee || employee.storeId != storeId) {
      return res.status(404).json({ error: "Employee not found" })
    }

    await employee.update({
      firstName,
      lastName,
      dateOfBirth,
      education,
      position,
      salary,
    })

    res.redirect(`/stores/${storeId}`)
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
}

module.exports = { getEmployeeById, updateEmployee }
