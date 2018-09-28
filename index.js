const installRecord = require('./manipulation/install-record');
const updateRecord = require('./manipulation/update-record');
const deleteRecord = require('./manipulation/delete-record');
const { TIME_INSERT, TIME_UPDATE, TIME_DELETE } = require('./config');

// setInterval(installRecord, TIME_INSERT);
// setInterval(updateRecord, TIME_UPDATE);
// setInterval(deleteRecord, TIME_DELETE);

installRecord();
// updateRecord();
// deleteRecord();