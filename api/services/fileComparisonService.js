var Promise = require('bluebird');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var del = require('del');
var MEDIA_OWNERS = require(path.join(__dirname,'../../config/mediaOwners'));
exports.compare = (mo, s3, FTP) => {
  return new Promise((resolve, reject) => {
    var ftpStrings = [];
    var s3Strings = [];
    var ftpData = FTP.data;
    _.forEach(ftpData, data => {
      ftpStrings.push(data.name);
    });
    _.forEach(s3, d => {
      s3Strings.push(d.split('/')[1]);
    });

    // var inFtpNotInS3 = _.difference(ftpStrings, s3Strings);
    var inS3NotInFtp = _.difference(s3Strings, ftpStrings);
    console.log(mo, inS3NotInFtp);
    // SyncFiles(resolve, reject, inS3NotInFtp, mo);
    //LOG TO FILE
    if (!inS3NotInFtp || inS3NotInFtp.length === 0) {
      console.log(mo, 'NO MISMATCH');
      WriteFtpLog('ok');
    }
    else {
      console.log(mo, 'MISMATCH!');
      WriteFtpLog('FTP MISMATCH');
    }
  });
}

// var SyncFiles = (resolve, reject, files, mo) => {
//   _.forEach(files, data => {
//     S3Service.GetFile(data, mo)
//     .then(file => {
//       return ftpService.connect(MEDIA_OWNERS[mo].ftp).then( () => ftpService.putFile(file, mo, __dirname+'/../../.tmpFiles/'+mo+'/') );
//     })
//     .then(() => {
//       return new Promise((resolve, reject) => {
//         console.log('delete')
//         del([__dirname+'/../../.tmpFiles/'+mo+'/**', !__dirname+'/../../.tmpFiles/'+mo]).then(resolve());
//       });
//     })
//     .catch(err => {
//       console.log('SYNC ERROR', err)
//     })
//   });
// }

var WriteFtpLog = str => {
  fs.writeFile(__dirname+'/../../log/ftp.txt', str, {mode: 438}, err => {
    if (err) console.log('Write FTP log err', err);
  });
}