const Sequelize = require('sequelize');

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
User.fakerInsert = function (faker) {
   let randomEmail = Math.floor((Math.random() * 10000)),
       randomFirstname = Math.floor((Math.random() * 3007)), 
       randomLastname = Math.floor((Math.random() * 474)), 
       randomPhone = Math.floor((Math.random() * 30000));

   return {
      email: faker.email[randomEmail],
      firstname: faker.firstName[randomFirstname],
      lastname: faker.lastName[randomLastname],
      phone: faker.phoneNumber[randomPhone]
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
Product.fakerInsert = function (faker) {
   let randomCompanyName = Math.floor((Math.random() * 21714)),
       randomPrice = Math.floor((Math.random() * 1001)),
       randomType = Math.floor((Math.random() * 24)),
       randomColor = Math.floor((Math.random() * 29811));

   return {
      email: faker.companyName[randomCompanyName],
      firstname: faker.price[randomPrice],
      lastname: faker.type[randomType],
      phone: faker.color[randomColor]
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