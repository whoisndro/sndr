// route/storerouter.js
const express = require("express")
const router = express.Router()
const StoresController = require("../controllers/Stores")

router.get("/", StoresController.getAllStores)

module.exports = router
