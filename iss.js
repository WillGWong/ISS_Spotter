const request = require('request');

const fetchMyIP = function(callback) { 
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error,null)
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP1. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let myIP = JSON.parse(body)['ip']
    callback(null, (myIP))
  })
}




const fetchCoordsByIP = function(IP, callback) {
  request(`https://ipvigilante.com/${IP}`, (error, response, body) => {
    if (error) {
      callback(error,null)
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP2. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });

  }
  )}



const fetchISSFlyoverTimes = function(coords, callback) {
  request('http://api.open-notify.org/iss-pass.json?lat=' + coords.latitude + "&lon=" + coords.longitude, (error, response, body) => {
    if (error) {
      callback(error,null)
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP3. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyTimes = JSON.parse(body).response
    callback(null, flyTimes)

  })
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyoverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { fetchISSFlyoverTimes, fetchMyIP, fetchCoordsByIP, nextISSTimesForMyLocation };