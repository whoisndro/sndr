"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employees.belongsTo(models.Stores, { foreignKey: "storeId" })
    }
  }
  Employees.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      education: DataTypes.STRING,
      position: DataTypes.STRING,
      storeId: DataTypes.INTEGER,
      salary: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Employees",
    }
  )
  return Employees
}
