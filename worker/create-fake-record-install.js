const { createFakeRecordInstall } = require('../helpers');
const { NUMBER_RECORD_INSERT } = require('../config');

module.exports = function (records, callback) {
   var data = [];
   for (let i = NUMBER_RECORD_INSERT; i >= 0; i--) {
     /** Ex: records = [email, firstname, lastname, phone]. Reduce records to generate data. Initail data {}
      * reduce loop 1: {email: 'a@a.com'}
      * reduce loop 2: {email: 'a@a.com', firstname: 'John'}
      * reduce loop 3: {email: 'a@a.com', firstname: 'John', lastname: 'Max'}
      * reduce loop 3: {email: 'a@a.com', firstname: 'John', lastname: 'Max', phone: '000-000-000'}
      * After push to array data. Finish array data will have format: 
      * data= [
      *  {email: 'a@a.com', firstname: 'John', lastname: 'Max', phone: '000-000-000'},
      *  {email: 'a@a.com', firstname: 'John', lastname: 'Max', phone: '000-000-000'},
      *  {email: 'a@a.com', firstname: 'John', lastname: 'Max', phone: '000-000-000'}
      * ]
      */
      data.push(records.reduce(createFakeRecordInstall, {}));
   }
   callback(null, data);
}