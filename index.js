const { fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes, nextISSTimesForMyLocation } = require('./iss');


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});





//let coords = { latitude: '49.26200', longitude: '-123.09230' }

//fetchISSFlyoverTimes(coords, (error, flyTimesj) => {
//  if (error) {
//    console.log(error)
//  }
//  if (flyTimes) {
//    console.log(resultObj)
//  }
//})


//fetchCoordsByIP("162.245.144.188", (error, coords) => {
//  if (error) {
//    console.log(error)
//  }
//  if (coords) {
//    console.log(coords)
//  }
//})

//fetchMyIP((error, ip) => {
//  if (error) {
//    console.log("It didn't work!" , error);
//    return;
//  }
//  console.log('It worked! Returned IP:' , ip);
//});