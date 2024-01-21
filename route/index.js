// route/index.js
const express = require("express")
const StoreRoute = require("./storerouter")
const EmployeeRoute = require("./employeerouter")
const Routes = express.Router()

const prefix = "api"

Routes.use(`/${prefix}/stores`, StoreRoute)
Routes.use(`/${prefix}/employee`, EmployeeRoute)

module.exports = Routes
