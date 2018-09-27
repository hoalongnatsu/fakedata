const { createFakeRecordUpdate } = require('../helpers');
const { NUMBER_RECORD_UPDATE } = require('../config');

module.exports = ({records, table}, callback) => {
   let set = records.reduce(createFakeRecordUpdate, '').slice(2);
   let query = `UPDATE ${table} SET ${set} WHERE id IN (select top ${NUMBER_RECORD_UPDATE} id from ${table} order by newid())`;
   callback(null, query);
}