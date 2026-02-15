require('dotenv').config();

console.log("Tentando conectar com o usuário:", process.env.DB_USER);
console.log("No banco:", process.env.DB_NAME);

module.exports = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'mysql',
      loggin: true,
      define: {
        timestamps: true,
        underscored: false,
      }
    }
  };