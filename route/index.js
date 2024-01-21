const express = require("express");
const StoreRoute = require("./storerouter");
const EmployeeRoute = require("./employeerouter");
const Controller = require("../controllers/Controller");
const Routes = express.Router();

Routes.use("/store", StoreRoute);
Routes.use("/employee", EmployeeRoute);

module.exports = Routes;

