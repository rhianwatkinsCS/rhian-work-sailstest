var axios = require('axios');

const cacheTimeToLive = 60000 * 15; // Cache lives for 15 minutes.

var cache = {data: null, timestamp: -1};

module.exports = {
  GetWeather: () => {
    if (cache.timestamp > (new Date).getTime() - cacheTimeToLive) return new Promise(resolve => resolve(cache.data));
    return axios.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22new%20york%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
    .then(r => {
      var result = {
        "location": r.data.query.results.channel.location.city,
        "temperature": r.data.query.results.channel.item.condition.temp,
        "weather": r.data.query.results.channel.item.condition.text,
        "weather-code": r.data.query.results.channel.item.condition.code,
        "time": (new Date).getTime()
      };
      cache.data = result;
      cache.timestamp = (new Date).getTime();
      return result;
    })
    .catch(() => 'bad weather API request');
  }
};
