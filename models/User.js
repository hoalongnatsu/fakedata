const Sequelize = require('sequelize');

const db = require('../server/connect');

const User = module.exports = db.define('users', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   email: { type: Sequelize.STRING },
   firstname: { type: Sequelize.STRING },
   lastname: { type: Sequelize.STRING },
   phone: { type: Sequelize.STRING },
}, {
      timestamps: false,
});