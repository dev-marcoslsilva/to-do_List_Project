"use strict";

const {Op} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          login: "Joelinton@gmail.com",
          name: "Joelinton",
          senha: "12345678",
          how_much_tasks: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          login: "JoseCarlos@gmail.com",
          name: "José Carlos",
          senha: "12345678",
          how_much_tasks: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "MariaSilva@gmail.com",
          name: "Maria Silva",
          senha: "12345678",
          how_much_tasks: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "AnaSouza@gmail.com",
          name: "Ana Souza",
          senha: "12345678",
          how_much_tasks: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "PedroAlmeida@gmail.com",
          name: "Pedro Almeida",
          senha: "12345678",
          how_much_tasks: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "JoaoPereira@gmail.com",
          name: "João Pereira",
          senha: "12345678",
          how_much_tasks: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "CarlaMendes@gmail.com",
          name: "Carla Mendes",
          senha: "12345678",
          how_much_tasks: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "LucasSantos@gmail.com",
          name: "Lucas Santos",
          senha: "12345678",
          how_much_tasks: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "FernandaLima@gmail.com",
          name: "Fernanda Lima",
          senha: "12345678",
          how_much_tasks: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "RicardoOliveira@gmail.com",
          name: "Ricardo Oliveira",
          senha: "12345678",
          how_much_tasks: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "JulianaCosta@gmail.com",
          name: "Juliana Costa",
          senha: "12345678",
          how_much_tasks: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "MarcosFerreira@gmail.com",
          name: "Marcos Ferreira",
          senha: "12345678",
          how_much_tasks: 25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "PatriciaGomes@gmail.com",
          name: "Patricia Gomes",
          senha: "12345678",
          how_much_tasks: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "users",
      {
        id: {
          [Op.ne]: 2,
        },
      },
      {}
    );
  },
};
