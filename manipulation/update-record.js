const workerFarm = require('worker-farm');
const { performance } = require('perf_hooks');

const { SCHEMA, sequelize } = require('../models/Schema');
const { NUMBER_WOKER, NUMBER_RECORD_UPDATE } = require('../config');
const divideWorkers = workerFarm(require.resolve('../worker/divide-worker'));
const workers = workerFarm(require.resolve('../worker/create-fake-query-update'));

module.exports = function () {
   let t0 = performance.now();

   for (const table in SCHEMA) {
      if (SCHEMA.hasOwnProperty(table)) {
         const { records } = SCHEMA[table];
         divideWorkers(NUMBER_WOKER, (err, number) => {
            for (let i = number; i >= 0; i--) {
               workers({records, table, NUMBER_RECORD_UPDATE: NUMBER_RECORD_UPDATE/number }, (err, query) => {
                  sequelize.query(query).spread((results, metadata) => {
                     let t1 = performance.now();
                     console.log("Took update: " + (t1 - t0) + " ms");
                  });
               });
            }
         });
      }
   }
}