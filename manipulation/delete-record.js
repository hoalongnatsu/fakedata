const workerFarm = require('worker-farm');
const { performance } = require('perf_hooks');

const { SCHEMA, sequelize } = require('../models/Schema');
const { NUMBER_RECORD_DELETE } = require('../config');
const workers = workerFarm(require.resolve('../worker'));

module.exports = function () {
   let t0 = performance.now();

   for (const table in SCHEMA) {
      if (SCHEMA.hasOwnProperty(table)) {
         workers(() => {
            let query = SCHEMA[table].model.fakerDalete(table, NUMBER_RECORD_DELETE);
            
            sequelize.query(query).spread((results, metadata) => {
               let t1 = performance.now();
               console.log("Took delete: " + (t1 - t0) + " ms");
            });
         });
      }
   }
}