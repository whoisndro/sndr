// route/storerouter.js
const express = require("express")
const router = express.Router()
const StoresController = require("../controllers/Stores")

router.get("/", StoresController.getAllStores)
router.get("/:storeId", StoresController.getStoreById)
router.post("/add", StoresController.addStore)
router.post("/:storeId/employees/add", StoresController.addEmployee)

module.exports = router
