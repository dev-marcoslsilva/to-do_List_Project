'use strict';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tasks', [
      // TAREFAS ATRASADAS (Para testar os 40%)
      {
        name: 'Tarefa Atrasada 1',
        description: 'Venceu há dois dias',
        status: 'Aberto',
        cost: '2026-02-12 10:00:00',
        id_user: 1, // <--- Use o ID do seu usuário aqui!
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tarefa Atrasada 2',
        description: 'Venceu ontem',
        status: 'Aberto',
        cost: '2026-02-13 15:00:00',
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // TAREFAS PARA HOJE (Para testar os 60%)
      {
        name: 'Tarefa de Hoje 1',
        description: 'Fazer agora de manhã',
        status: 'Aberto',
        cost: '2026-02-14 09:00:00',
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tarefa de Hoje 2',
        description: 'Fazer no final do dia',
        status: 'Aberto',
        cost: '2026-02-14 18:00:00',
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // TAREFA CONCLUÍDA
      {
        name: 'Tarefa Feita',
        description: 'Já finalizada',
        status: 'Concluido',
        cost: '2026-02-14 12:00:00',
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tasks', null, {});
  }
};
