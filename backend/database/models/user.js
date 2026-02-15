"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      how_much_tasks: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "User",
      modelTable: "users"
    }
  );
  return User;
};
