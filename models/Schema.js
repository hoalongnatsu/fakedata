const Sequelize = require('sequelize');

const sequelize = require('../server/connect');

const Product = module.exports = sequelize.define('products', {
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

const User = module.exports = sequelize.define('users', {
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

const SCHEMA = {
   users: {
      model: User,
      records: ['email', 'firstname', 'lastname', 'phone']
   },
   products: {
      model: Product,
      records: ['name', 'price', 'type', 'color']
   }
};

module.exports = {
   SCHEMA,
   sequelize
};