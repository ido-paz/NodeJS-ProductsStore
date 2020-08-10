let testsArray=[];
let iterations=5;
let path = require('path');
let async = require('async'); //https://www.npmjs.com/package/async
let newman = require('newman');
let parametersForTestRun = {
    iterationCount:iterations,
    collection: path.join(__dirname, 'Get_ProductBy_postman_collection.json')
  //,environment: path.join(__dirname, 'postman_environment.json'), //your env
  };
//
let newmanRun = function(done) {
  newman.run(parametersForTestRun, done);
};
//
for (let index = 0; index < iterations; index++) {
  testsArray.push(newmanRun);  
}
// Runs the Postman sample collection thrice, in parallel.
console.log(`${new Date().toLocaleTimeString()} : started async script`);
//
async.parallel(testsArray,
  function(err, results) {
    if (err) {
       console.error(`has error : ${err}`);  
    }    
    //
    results.forEach(function(result) {
      let started = new Date(result.run.timings.started);
      let completed = new Date(result.run.timings.completed);
      let duration = result.run.timings.completed - result.run.timings.started;
      //
      started.setTime(result.run.timings.started);
      completed.setTime(result.run.timings.completed);
      //
      console.info(`started at ${started.toLocaleTimeString()} ran for ${duration}ms , responseAverage ${result.run.timings.responseAverage}: ${result.collection.name}`);
      //console.info(`started at ${started.toLocaleTimeString()} , completed at ${completed.toLocaleTimeString()}: ${result.collection.name}`);
    });
    console.log(`${new Date().toLocaleTimeString()} : ended async script`);
  });
