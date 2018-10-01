const fs = require('fs');
const json = require('big-json');

const readStream = fs.createReadStream('faker.json');
const parseStream = json.createParseStream();

const installRecord = require('./manipulation/install-record');
const updateRecord = require('./manipulation/update-record');
const deleteRecord = require('./manipulation/delete-record');
const { TIME_INSERT, TIME_UPDATE, TIME_DELETE } = require('./config');

console.log('Waiting read data ...');

// setInterval(installRecord, TIME_INSERT);
// setInterval(updateRecord, TIME_UPDATE);
// setInterval(deleteRecord, TIME_DELETE);

parseStream.on('data', function (faker) {
   console.log('Start generate script.');
   installRecord(faker);
   // updateRecord();
   // deleteRecord();
});

readStream.pipe(parseStream);