var fs = require('fs'),
    path = require('path');

module.exports = {
  index: (req, res) => res.ok('pong!'),
  log: (req, res) => {
    fs.readFile(__dirname + "/../../log/log.txt", 'utf8', function (err, data) {
      if (err) res.badRequest(err);
      res.ok(data);
    })
  },
  ftplog: (req, res) => {
    fs.readFile(__dirname + "/../../log/ftp.txt", 'utf8', function (err, data) {
      if (err) res.badRequest(err);
      res.ok(data);
    })
  }
}