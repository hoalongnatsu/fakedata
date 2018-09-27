const { createFakeRecordUpdate } = require('../helpers');
const { NUMBER_RECORD_UPDATE } = require('../config');

module.exports = ({records, table}, callback) => {
   /** Ex: records = [email, firstname, lastname, phone]. Reduce records to generate data. Initail data ''
    * reduce loop 1: , email = 'a@a.com'
    * reduce loop 2: , email = 'a@a.com', firstname: 'John'
    * reduce loop 3: , email = 'a@a.com', firstname: 'John', lastname: 'Max'
    * reduce loop 4: , email = 'a@a.com', firstname: 'John', lastname: 'Max', phone: '000-000-000'
    * After slice 2 first character.
    * Result: email = 'a@a.com', firstname: 'John', lastname: 'Max', phone: '000-000-000'
    */
   let set = records.reduce(createFakeRecordUpdate, '').slice(2);
   let query = `UPDATE ${table} SET ${set} WHERE id IN (select top ${NUMBER_RECORD_UPDATE} id from ${table} order by newid())`;
   callback(null, query);
}