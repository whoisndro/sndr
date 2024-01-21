// models/stores.js
"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Stores extends Model {
    static associate(models) {
      Stores.hasMany(models.Employees, { foreignKey: "storeId" })
    }
  }

  Stores.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      location: DataTypes.STRING,
      category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Stores",
    }
  )

  Stores.beforeCreate(async (store, options) => {
    const categoryCodeMap = {
      Mart: "001",
      Midi: "002",
      Express: "003",
    }

    const categoryCode = categoryCodeMap[store.category]

    if (!categoryCode) {
      throw new Error("Invalid category")
    }

    const currentTime = new Date().getTime()
    const generatedCode = `${categoryCode}-${currentTime}`

    store.code = generatedCode
  })

  return Stores
}
