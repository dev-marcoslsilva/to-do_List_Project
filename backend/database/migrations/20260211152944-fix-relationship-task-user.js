'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //await queryInterface.removeColumn('Users', 'id_task');

    await queryInterface.addColumn('Tasks', 'id_user', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    // Caso precise desfazer (Voltar ao que era antes)
    await queryInterface.removeColumn('Tasks', 'id_user');
    await queryInterface.addColumn('Users', 'id_task', {
      type: Sequelize.INTEGER,
      references: { model: 'Tasks', key: 'id' }
    });
  }
};
