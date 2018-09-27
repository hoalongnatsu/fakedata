const faker = require('faker');

function createFakeColumn(column) {
   switch (column) {
      case 'email':
         return faker.internet.email();
      case 'firstname':
         return faker.name.firstName();
      case 'lastname':
         return faker.name.lastName();
      case 'phone':
         return faker.phone.phoneNumber();
      case 'name':
         return faker.company.companyName();
      case 'price':
         return faker.commerce.price();
      case 'type':
         return faker.database.type();
      case 'color':
         return faker.commerce.color();
      default: break;
   }
}

function createFakeRecordInstall(record, column) {
   record[column] = createFakeColumn(column);
   return record;
};

function createFakeRecordUpdate(record, column) {
   return `${record}, ${column} = '${createFakeColumn(column).replace("'", "\'")}'`;
}

module.exports = {
   createFakeRecordInstall,
   createFakeRecordUpdate
};
