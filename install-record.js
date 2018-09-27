const workerFarm = require('worker-farm');

const SCHEMA = require('./models/Schema');
const { performance } = require('perf_hooks');

const workers = workerFarm(require.resolve('./worker/install'));

var t0 = performance.now();

for (const table in SCHEMA) {
   if (SCHEMA.hasOwnProperty(table)) {
      workers(SCHEMA[table].records, (err, res) => {
         // SCHEMA[table].model.bulkCreate(res);
         workerFarm.end(workers);
      });
   }
}

