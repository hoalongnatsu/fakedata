const Sequelize = require('sequelize');

const db = require('../server/connect');

const Product = module.exports = db.define('products', {
   id: { 
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   name: { type: Sequelize.STRING },
   price: { type: Sequelize.FLOAT },
   type: { type: Sequelize.STRING },
   color: { type: Sequelize.STRING },
}, {
      timestamps: false,
});