const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


//FOR IP
const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


//for GEO_POS
const fetchCoordsByIP = function (callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    //console.log(body)
    // const geoPos = JSON.parse(body);
    // callback(null, { latitude: geoPos.latitude, longitude: geoPos.longitude });
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });

  });
};

///TO see SpaceSHIP:

// **
//  * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.//  * Input:
//  *   - An object with keys `latitude` and `longitude`
//  *   - A callback (to pass back an error or the array of resulting data)
//  * Returns (via Callback):
//  *   - An error, if any (nullable)
//  *   - The fly over times as an array of objects (null if error). Example:
//  *     [ { risetime: 134564234, duration: 600 }, ... ] /
// { latitude: 44.0539, longitude: -79.4487 }



const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    console.log(body)
    const flyOver = JSON.parse(body).response;
    callback(null, flyOver);


  });

};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};



module.exports = {
  fetchMyIP
};
module.exports = {
  fetchCoordsByIP
};
module.exports = {
  fetchISSFlyOverTimes
};
module.exports = {
  nextISSTimesForMyLocation
};