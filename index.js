const {fetchMyIP} = require('./iss');
const {fetchCoordsByIP} = require('./iss');
const {fetchISSFlyOverTimes} = require('./iss');
const {nextISSTimesForMyLocation} = require('./iss');


//FOR IP
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});


// for GEO_POS
fetchCoordsByIP((error, geo) => {
  if (error) {
    console.log("No geopositions found!", error);
    return;
  }

  console.log('It worked! Returned Geoposition :', geo);
});


// //for Spaceship:

const exampleCoords = { latitude: '44.0539', longitude: '-79.4487' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
});


// // ASSEMBLER- ALL TOGETHER

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});