const workerFarm = require('worker-farm');
const { performance } = require('perf_hooks');

const { SCHEMA } = require('../models/Schema');
const { NUMBER_WOKER, NUMBER_RECORD_INSERT } = require('../config');
const divideWorkers = workerFarm(require.resolve('../worker/divide-worker'));
const workers = workerFarm(require.resolve('../worker/create-fake-record-install'));

module.exports = () => {
   // let t0 = performance.now();

   for (const table in SCHEMA) {
      if (SCHEMA.hasOwnProperty(table)) {
         const { records, model } = SCHEMA[table];
         divideWorkers(NUMBER_WOKER, (err, number) => {
            for (let i = number; i >= 0; i--) {
               workers({records, NUMBER_RECORD_INSERT: NUMBER_RECORD_INSERT/number }, (err, res) => {
                  // Install multiple records
                  model.bulkCreate(res).then(() => {
                     // let t1 = performance.now();
                     // console.log("Took install: " + (t1 - t0) + " ms");
                  });          
               });
            }
         });
      }
   }
};