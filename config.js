const DATABASE = {
   host: '35.227.175.11',
   name: 'faker',
   user: 'sa',
   password: '12345678x@X' 
};

const NUMBER_RECORD_INSERT = 100000;
const NUMBER_RECORD_UPDATE = 10;
const NUMBER_RECORD_DELETE = 20;

const TIME_INSERT = 1000; // 1s
const TIME_UPDATE = 2000; // 2s
const TIME_DELETE = 3000; // 3s

module.exports = {
   DATABASE,
   NUMBER_RECORD_INSERT,
   NUMBER_RECORD_UPDATE,
   NUMBER_RECORD_DELETE,
   TIME_INSERT,
   TIME_UPDATE,
   TIME_DELETE
};