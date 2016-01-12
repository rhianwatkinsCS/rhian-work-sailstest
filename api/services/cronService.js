var CronJob = require('cron').CronJob,
    fs = require('fs'),
    path = require('path');

module.exports = {
  // cron: () => {
  //   if (!fs.existsSync( path.join(__dirname,'../../.sync/') )) {
  //     fs.mkdirSync(path.join(__dirname,'../../.sync/'));
  //   }
  //   var job = new CronJob('0 */5 * * * *', () => {
  //     var buildFile = 'weather.js';
  //     var CSbuildFile = 'weather' + (new Date).getTime() + '.js';
  //     WeatherService.GetWeather()
  //     .then(data => {
  //       fs.writeFile(sails.config.weatherPath + CSbuildFile, "var weatherData = " + JSON.stringify(data) + ";", {mode: 438}, err => {
  //         fs.writeFile(sails.config.weatherPath + buildFile, "var weatherData = " + JSON.stringify(data) + ";", {mode: 438}, err => {
  //           if (err) return console.log(err);
  //           fs.chmod(sails.config.weatherPath + buildFile, '0766');
  //           fs.chmod(sails.config.weatherPath + CSbuildFile, '0766');
  //           sails.controllers.ftp.upload(buildFile, CSbuildFile);
  //         });
  //       });
  //     })
  //     .then( () => {
  //       sails.controllers.ftp.compareAndSync();
  //     } )
  //     .catch(data => console.log(data));
  //   }, () => console.log('>> CRON STOP <<'), true);
  // }
}