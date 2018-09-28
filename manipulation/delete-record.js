const workerFarm = require('worker-farm');
const { performance } = require('perf_hooks');

const { SCHEMA, sequelize } = require('../models/Schema');
const { NUMBER_WOKER, NUMBER_RECORD_DELETE } = require('../config');
const divideWorkers = workerFarm(require.resolve('../worker/divide-worker'));
const workers = workerFarm(require.resolve('../worker/create-fake-query-delete'));

module.exports = function () {
   let t0 = performance.now();

   for (const table in SCHEMA) {
      if (SCHEMA.hasOwnProperty(table)) {
         divideWorkers(NUMBER_WOKER, (err, number) => {
            for (let i = number; i >= 0; i--) {
               workers({table, NUMBER_RECORD_DELETE: NUMBER_RECORD_DELETE/number }, (err, query) => {
                  sequelize.query(query).spread((results, metadata) => {
                     let t1 = performance.now();
                     console.log("Took delete: " + (t1 - t0) + " ms");
                  });
               });
            }
         });
      }
   }
}