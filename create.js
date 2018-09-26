const { createFakeRecord } = require('./helpers');
const { NUMBER_RECORD_INSERT } = require('./config');
const SCHEMA = require('./models/Schema');
const { performance } = require('perf_hooks');

const create = [];

var t0 = performance.now();

for (const table in SCHEMA) {
   if (SCHEMA.hasOwnProperty(table)) {
      var data = [];
      for (let i = NUMBER_RECORD_INSERT; i >= 0; i--) {
         data.push(SCHEMA[table].records.reduce(createFakeRecord, {}));
      }
      // create.push(SCHEMA[table].model.bulkCreate(data));
   }
}

var t1 = performance.now();
console.log("Took: " + (t1 - t0) + " msecs");

// Promise.all(create).then(([user, product]) => console.log(user));
