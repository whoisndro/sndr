// controllers/Stores.js
const { Stores } = require("../models")

const getAllStores = async (req, res) => {
  try {
    const data = await Stores.findAll()

    res.status(200).json({ data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = {
  getAllStores,
}
