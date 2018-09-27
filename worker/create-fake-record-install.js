const { createFakeRecordInstall } = require('../helpers');
const { NUMBER_RECORD_INSERT } = require('../config');

module.exports = function (records, callback) {
   var data = [];
   for (let i = NUMBER_RECORD_INSERT; i >= 0; i--) {
      // Generate data [{email: '', name: ''},{email: '', name: ''}]
      data.push(records.reduce(createFakeRecordInstall, {}));
   }
   callback(null, data);
}