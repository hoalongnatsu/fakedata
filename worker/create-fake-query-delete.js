const { NUMBER_RECORD_DELETE } = require('../config');

module.exports = (table, callback) => {
   let query = `DELETE FROM ${table} WHERE id IN (select top ${NUMBER_RECORD_DELETE} id from ${table} order by newid())`;
   callback(null, query);
}