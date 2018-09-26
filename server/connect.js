const Sequelize = require('sequelize');

const { DATABASE } = require('../config');

const db = module.exports = new Sequelize(DATABASE.name, DATABASE.user, DATABASE.password, {
      host: DATABASE.host,
      dialect: 'mssql',
      operatorsAliases: false,
      dialectOptions: {
         encrypt: true
      },
      pool: {
         max: 5,
         min: 0,
         acquire: 30000,
         idle: 10000
      },
});

// db.authenticate()
//    .then(() => {
//       console.log('Connection has been established successfully.');
//    })
//    .catch(err => {
//       console.error('Unable to connect to the database:', err);
//    });