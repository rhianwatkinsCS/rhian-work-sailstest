var axios = require('axios');

// const cacheTimeToLive = 60000 * 15; // Cache lives for 15 minutes.

var cache = {data: null, timestamp: -1};

module.exports = {
  GetStarWarsApi: (body) => {
    if (process.env.RHIAN_JUST_MESSING_ABOUT) {
      //sdfghjk
      if (body) {
          swroot = (body.swroot) ? body.swroot : "people";
          swid = (body.swid) ? body.swid : "";
        return axios.get("http://swapi.co/api/"+swroot+"/"+swid)
        .then(r => {
          cache.data = r;
          cache.timestamp = (new Date).getTime();
          return r;
        })
        .catch(() => 'bad star wars API request');
      }

    }
  }
};
