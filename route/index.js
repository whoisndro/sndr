// route/index.js
const express = require("express")
const StoreRoute = require("./storerouter")
const EmployeeRoute = require("./employeerouter")
const Routes = express.Router()
const { menus, getStoreByIdForAdd } = require("../controllers/Stores")

Routes.use(`/stores`, StoreRoute)
Routes.use(`/employees`, EmployeeRoute)

Routes.get(`/stores/add`, (req, res) => {
  res.render("add-store")
})

Routes.get(`/stores/:storeId/employees/add`, async (req, res) => {
  const { storeId } = req.params // Extract storeId from the request parameters

  try {
    const data = await getStoreByIdForAdd(storeId)

    res.render("add-employees", { data, menus })
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
})

Routes.get("/", (req, res) => {
  res.redirect(`/stores`)
})

module.exports = Routes
