var fs = require('fs');
var Client = require('ftp');
var path = require('path');
var colors = require('colors');
var Promise = require('bluebird');
var clientObj = {};
var config = {};

Promise.promisifyAll(fs);

//Using objects to support mutliple client connections at the same time.
exports.connect = _config => {
  return new Promise((resolve, reject) => {
    clientObj[_config.name] = new Client();
    config[_config.name] = _config;
    clientObj[_config.name].on('ready', resolve);
    clientObj[_config.name].connect(config[_config.name]);
  });
}

// Upload file
// mediaOwner = mo name as string (to match _config.name above)
exports.putFile = (file, mediaOwner, _newPath) => {
  return new Promise((resolve, reject) => {
    clientObj[mediaOwner].put((_newPath ? _newPath : sails.config.weatherPath) + file, file, err => {
      if (err) {
        console.log('FTP ERROR', err);
        reject(err);
      }
      else {
        console.log( ("Successfully uploaded " + file + " to " + mediaOwner).green + " - " + String(new Date()).yellow );
        clientObj[mediaOwner].end();
        resolve();
      }
    });
  });
}

exports.getFiles = mediaOwner => {
  return new Promise((resolve, reject) => {
    clientObj[mediaOwner].list((err, list) => {
      if (err) return reject(err);
      clientObj[mediaOwner].end();
      resolve({mo: mediaOwner, data: list});
    });
  });
}