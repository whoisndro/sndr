const { Stores, Employees } = require("../models")
const {
  calculateTotalSalary,
  formatSalaryToRupiah,
  calculateAge,
} = require("../helpers/employees")

const menus = [
  {
    option: "Home",
  },
  {
    option: "Add a New Store",
  },
  {
    option: "Employees",
  },
]

const getAllStores = async (req, res) => {
  try {
    const data = await Stores.findAll()

    res.render("stores-list", { data, menus })
  } catch (err) {
    throw err
  }
}

const addStore = async (req, res) => {
  try {
    await Stores.create(req.body)

    res.redirect("/")
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const getStoreById = async (req, res) => {
  const { storeId } = req.params

  try {
    const store = await Stores.findByPk(storeId)

    if (!store) {
      return res.status(404).json({ error: "Store not found" })
    }

    const employees = await getAllEmployeesByStoreId(storeId)

    const employeesWithFormattedSalary = employees.map((employee) => ({
      ...employee.dataValues,
      salary: formatSalaryToRupiah(employee.salary),
      dateOfBirth: calculateAge(employee.dateOfBirth),
    }))

    const totalSalary = calculateTotalSalary(employees)
    const formattedTotalSalary = formatSalaryToRupiah(totalSalary)

    res.render("see-detail", {
      store,
      employeesWithFormattedSalary,
      formattedTotalSalary,
      menus,
    })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
}

const getAllEmployeesByStoreId = async (storeId) => {
  try {
    const employees = await Employees.findAll({
      where: { storeId },
    })
    return employees
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getStoreByIdForAdd = async (storeId) => {
  try {
    const data = await Stores.findByPk(storeId)

    if (!data) {
      throw new Error("Store not found")
    }

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const addEmployee = async (req, res) => {
  try {
    const { storeId } = req.params
    const { firstName, lastName, dateOfBirth, education, position, salary } =
      req.body

    console.log("Adding employee:", {
      storeId,
      firstName,
      lastName,
      dateOfBirth,
      education,
      position,
      salary,
    })

    const newEmployee = await Employees.create({
      storeId,
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

module.exports = {
  getAllStores,
  addStore,
  getStoreById,
  addEmployee,
  menus,
  getStoreByIdForAdd,
}
