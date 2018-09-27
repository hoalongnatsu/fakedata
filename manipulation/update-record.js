const workerFarm = require('worker-farm');
const { performance } = require('perf_hooks');

const { SCHEMA, sequelize } = require('../models/Schema');
const workers = workerFarm(require.resolve('../worker/create-fake-query-update'));

module.exports = function () {
   let t0 = performance.now();

   for (const table in SCHEMA) {
      if (SCHEMA.hasOwnProperty(table)) {
         const { records } = SCHEMA[table];
         // Create fake query to update random record
         workers({records, table}, (err, query) => {
            sequelize.query(query).spread((results, metadata) => {
               let t1 = performance.now();
               console.log("Took update: " + (t1 - t0) + " ms");
            });
         });
      }
   }
}