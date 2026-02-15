'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      id_task: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tasks",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      how_much_tasks: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};