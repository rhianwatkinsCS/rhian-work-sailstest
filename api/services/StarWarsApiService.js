var axios = require('axios');

// const cacheTimeToLive = 60000 * 15; // Cache lives for 15 minutes.

var cache = {data: null, timestamp: -1};

module.exports = {
  GetStarWarsApi: (body) => {
    var swroot = (body!==undefined && body.swroot) ? body.swroot : "people";
    var swid = (body!==undefined && body.swid) ? body.swid+"/" : "";
    var swurl = "http://swapi.co/api/"+swroot+"/"+swid;
    console.log(swurl);
    return axios.get(swurl)
    .then(r => {
      cache.data = r;
      cache.timestamp = (new Date).getTime();
      return r;
    })
    .catch(() => 'bad star wars API request');
  }
};
