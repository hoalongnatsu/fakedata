const workerFarm = require('worker-farm');
const { performance } = require('perf_hooks');
const faker = require('faker');
var zone1 = require('napajs').zone.create('zone1');

const { SCHEMA } = require('../models/Schema');
const { NUMBER_RECORD_INSERT, DECREASE_TIME_INSTALL } = require('../config');
const workers = workerFarm(require.resolve('../worker'));

module.exports = () => {
   let t0 = performance.now();

   for (const table in SCHEMA) {
      if (SCHEMA.hasOwnProperty(table)) {
         const { model } = SCHEMA[table], promises = [];

         workers(() => {
            // Insert data different
            // var data = [];
            // for (let i = NUMBER_RECORD_INSERT; i >= 0; i--) {
            //    data.push(model.fakerInsert());
            // }

            // let t1 = performance.now();
            // console.log("Took install: " + (t1 - t0) + " ms");

            // model.bulkCreate(data).then(() => {
            //    let t1 = performance.now();
            //    console.log("Took install: " + (t1 - t0) + " ms");
            // });
            
            
            // Insert data same
            for (let i = DECREASE_TIME_INSTALL; i >= 0; i--) {     
               let promise = zone1.execute((number, fakerData) => {
                  
                  var data = [];
                  for (let i =  number; i >= 0; i--) {
                     data.push(fakerData);
                  }
                  return data;
               }, [NUMBER_RECORD_INSERT/DECREASE_TIME_INSTALL, model.fakerInsert()]);
   
               promises.push(promise);
            }
            
            Promise.all(promises).then((data) => {
               let dataInsert = [];

               for (let index = data.length - 1; index >= 0; index--) {
                  dataInsert = dataInsert.concat(JSON.parse(data[index]._payload));
               }
               
               let t1 = performance.now();
               console.log("Took install: " + (t1 - t0) + " ms");

               // model.bulkCreate(dataInsert).then(() => {
               //    let t1 = performance.now();
               //    console.log("Took install: " + (t1 - t0) + " ms");
               // });
            });
         });
      }
   }
};