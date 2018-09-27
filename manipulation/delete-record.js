const workerFarm = require('worker-farm');
const { performance } = require('perf_hooks');

const { SCHEMA, sequelize } = require('../models/Schema');
const workers = workerFarm(require.resolve('../worker/create-fake-query-delete'));

module.exports = function () {
   let t0 = performance.now();

   for (const table in SCHEMA) {
      if (SCHEMA.hasOwnProperty(table)) {
         workers(table, (err, query) => {
            sequelize.query(query).spread((results, metadata) => {
               let t1 = performance.now();
               console.log("Took delete: " + (t1 - t0) + " ms");
            });
         });
      }
   }
}