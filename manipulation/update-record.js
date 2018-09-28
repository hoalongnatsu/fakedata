const workerFarm = require('worker-farm');
const { performance } = require('perf_hooks');

const { SCHEMA, sequelize } = require('../models/Schema');
const { NUMBER_RECORD_UPDATE } = require('../config');
const workers = workerFarm(require.resolve('../worker'));

module.exports = function () {
   let t0 = performance.now();

   for (const table in SCHEMA) {
      if (SCHEMA.hasOwnProperty(table)) {
         const { model } = SCHEMA[table];

         workers(() => {
            let query = model.fakerUpdate(table, NUMBER_RECORD_UPDATE);

            sequelize.query(query).spread((results, metadata) => {
               let t1 = performance.now();
               console.log("Took update: " + (t1 - t0) + " ms");
            });
         });
      }
   }
}