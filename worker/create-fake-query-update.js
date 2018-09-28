const { createFakeRecordUpdate } = require('../helpers');

module.exports = ({records, table, NUMBER_RECORD_UPDATE}, callback) => {
   let set = records.reduce(createFakeRecordUpdate, '').slice(2);
   let query = `UPDATE ${table} SET ${set} WHERE id IN (select top ${NUMBER_RECORD_UPDATE} id from ${table} order by newid())`;
   callback(null, query);
}