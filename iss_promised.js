const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json')
};

const fetchCoordsByIP = function(body) {
  let address = JSON.parse(body).ip
  return request(`https://ipvigilante.com/${address}`)
};

const fetchISSFlyoverTimes = function(coords) {
  const { latitude, longitude } = JSON.parse(coords).data;
  return request('http://api.open-notify.org/iss-pass.json?lat=' + latitude + "&lon=" + longitude)
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyoverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };