const User = require('./User');
const Product = require('./Product');

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

module.exports = SCHEMA;