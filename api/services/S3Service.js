var AWS = require('aws-sdk');
var Promise = require('bluebird');
var _ = require('lodash');
var fs = require('fs');
var s3bucket = new AWS.S3({params: {Bucket: 'citibank-sweet-html-ftp'}});
exports.GetS3Files = () => {
  return new Promise((resolve, reject) => {
    s3bucket.listObjects({Bucket: 'citibank-sweet-html-ftp'}, (err, data) => {
      if (err) return reject(err);
      var d = data.Contents;
      var items = {
        cemusa: [],
        outfront: []
      };
      _.find(d, item => {
        if ( item.Key.match(/(cemusa\/(\w|\d))/g) ) { //CEMSUA FILE
          items.cemusa.push(item.Key);
        }
        else if ( item.Key.match(/(outfront\/(\w|\d))/g) ) { //OUTFRONT FILE
          items.outfront.push(item.Key);
        }
      });
      resolve(items);
    });
  });
}
exports.GetFile = (file, mo) => {
  return new Promise((resolve, reject) => {
    var writeFile = fs.createWriteStream(__dirname + '/../../.tmpFiles/'+mo+'/'+file)
    // s3bucket.getObject( { Bucket: "citibank-sweet-html-ftp", Key: mo+'/'+file }, (error, data) => {
    //   if (error) return console.log(error);
    //   resolve(data);
    // });
    s3bucket.getObject({ Bucket: "citibank-sweet-html-ftp", Key: mo+'/'+file }).
    on('httpData', function(chunk) { writeFile.write(chunk); }).
    on('httpDone', function() { writeFile.end(); resolve(file); }).
    send();
  });
}