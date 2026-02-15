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
      id_task: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tasks",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
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
    }
  );
  return User;
};
