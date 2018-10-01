const workerFarm = require('worker-farm');
const { performance } = require('perf_hooks');

const { SCHEMA } = require('../models/Schema');
const { NUMBER_RECORD_INSERT } = require('../config');
const workers = workerFarm(require.resolve('../worker'));

module.exports = (faker) => {
   let t0 = performance.now();

   for (const table in SCHEMA) {
      if (SCHEMA.hasOwnProperty(table)) {
         const { model } = SCHEMA[table];

         workers(() => {
            var data = [];
            for (let i = NUMBER_RECORD_INSERT; i >= 0; i--) {
               data.push(model.fakerInsert(faker));
            }

            let t1 = performance.now();
            console.log("Took install: " + (t1 - t0) + " ms");

            // model.bulkCreate(data).then(() => {
            //    let t1 = performance.now();
            //    console.log("Took install: " + (t1 - t0) + " ms");
            // });
         });
      }
   }
};