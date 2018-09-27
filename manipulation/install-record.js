const workerFarm = require('worker-farm');
const { performance } = require('perf_hooks');

const { SCHEMA } = require('../models/Schema');

const workers = workerFarm(require.resolve('../worker/create-fake-record-install'));

module.exports = () => {
   let t0 = performance.now();

   for (const table in SCHEMA) {
      if (SCHEMA.hasOwnProperty(table)) {
         const { records, model } = SCHEMA[table];
         // Create data required to install. Format [{email: '', name: ''}, {email: '', name: ''}]
         workers(records, (err, res) => {
            // Install multiple records
            model.bulkCreate(res).then(() => {
               let t1 = performance.now();
               console.log("Took install: " + (t1 - t0) + " ms");
            });          
         });
      }
   }
};