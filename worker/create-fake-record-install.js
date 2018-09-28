const { createFakeRecordInstall } = require('../helpers');

module.exports = function ({records, NUMBER_RECORD_INSERT}, callback) {
   var data = [];
   for (let i = NUMBER_RECORD_INSERT; i >= 0; i--) {
      // Generate data [{email: '', name: ''},{email: '', name: ''}]
      data.push(records.reduce(createFakeRecordInstall, {}));
   }
   callback(null, data);
}