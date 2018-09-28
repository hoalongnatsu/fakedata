const Sequelize = require('sequelize');
const faker = require('faker');

const sequelize = require('../server/connect');

// Create SHCEMA for users table
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

User.sync({force: false});

// Create faker for insert into users table
User.fakerInsert = function () {
   return {
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      phone: faker.phone.phoneNumber()
   }
}

// Create faker for update users table
User.fakerUpdate = function (table, number) {
   return  `UPDATE ${table} 
            SET
            email = '${faker.internet.email()}',
            firstname = '${faker.name.firstName()}',
            lastname = '${faker.name.lastName()}',
            phone = '${faker.phone.phoneNumber()}'
            WHERE id IN (select top ${number} id from ${table} order by newid())`;
}

User.fakerDalete = function (table, number) {
   return `DELETE FROM ${table} WHERE id IN (select top ${number} id from ${table} order by newid())`;
}

// Create SHCEMA for products table
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

Product.sync({force: false});

// Create faker for insert products table
Product.fakerInsert = function () {
   return {
      name: faker.company.companyName(),
      price: faker.commerce.price(),
      type: faker.database.type(),
      color: faker.commerce.color()
   }
}

// Create faker for update products table
Product.fakerUpdate = function (table, number) {
   return  `UPDATE ${table} 
            SET
            name = '${faker.internet.email()}', 
            price = '${faker.commerce.price()}', 
            type = '${faker.database.type()}', 
            color = '${faker.commerce.color()}'
            WHERE id IN (select top ${number} id from ${table} order by newid())`;
}

Product.fakerDalete = function (table, number) {
   return `DELETE FROM ${table} WHERE id IN (select top ${number} id from ${table} order by newid())`;
}

const SCHEMA = {
   users: {
      model: User,
   },
   products: {
      model: Product,
   }
};

module.exports = {
   SCHEMA,
   sequelize
};