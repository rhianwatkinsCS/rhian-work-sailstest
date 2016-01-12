var path = require('path'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    del = require('del'),
    colors = require('colors'),
    fs = require('fs'),
    MEDIA_OWNERS = require(path.join(__dirname,'../../config/mediaOwners'));

module.exports = {
  upload: (moFile, CSFile) => {
    if (process.env.NODE_ENV != "production") delete MEDIA_OWNERS["candyspace"];
    var promises = [];
    _.forEach(MEDIA_OWNERS, data => promises.push(ftpMOPush(data.ftp, moFile, CSFile)) );

    Promise.all(promises)
    .then(() => {
      return new Promise((resolve, reject) => {
        del([sails.config.weatherPath + CSFile, sails.config.weatherPath + moFile])
        .then(paths => {
          WriteLog('ok');
          console.log("-------------------- LOG OK ------------------".blue);
          resolve();
        });
      });
    })
    .error( err => {
      del([sails.config.weatherPath + CSFile, sails.config.weatherPath + moFile]);
      console.log('FTP MO ERROR', err);
      if (!fs.existsSync( path.join(__dirname,'../../log/') )) {
        fs.mkdirSync(path.join(__dirname,'../../log/'));
        WriteLog(err);
      }
      else WriteLog(err);
    });
  },
  compareAndSync: () => {
    if (!fs.existsSync( path.join(__dirname,'../../.tmpFiles/cemusa') )) {
      fs.mkdirSync(path.join(__dirname,'../../.tmpFiles/cemusa'));
    }
    if (!fs.existsSync( path.join(__dirname,'../../.tmpFiles/outfront') )) {
      fs.mkdirSync(path.join(__dirname,'../../.tmpFiles/outfront'));
    }
    /////////////////////////////////////////////////////////////////////
    //S3 FTP CHECK
      var mos = MEDIA_OWNERS;
      var cemusaS3, outfrontS3, outfrontFTP, cemusaFTP;
      S3Service.GetS3Files()
      .then((items) => {
        cemusaS3 = items.cemusa;
        outfrontS3 = items.outfront;
        delete mos["candyspace"];
        var promises = [];
        _.forEach(mos, data => promises.push(ftpList(data.ftp)) );
        return Promise.all(promises)
      })
      .then((data) => {
        return new Promise((resolve, reject) => {
          if (!data) reject('NO FTP FILE DATA');
          if (data[0].mo === "cemusa") {
            cemusaFTP = data[0];
            outfrontFTP = data[1];
            resolve();
          }
          else {
            cemusaFTP = data[1];
            outfrontFTP = data[0];
            resolve();
          }
        });
      })
      .then(() => {
        return new Promise.all([fileComparisonService.compare('cemusa', cemusaS3, cemusaFTP), fileComparisonService.compare('outfront', outfrontS3, outfrontFTP)]);
      })
      .catch(data => console.log('----------------------------------------------\n', 'PROMISE REJECTION:', data));
  }
};

var WriteLog = str => {
  fs.writeFile(__dirname+'/../../log/log.txt', str, {mode: 438}, err => {
    if (err) console.log('Write log err', err);
  });
}

var ftpMOPush = (ftp, moFile, CSFile) => {
  return ftpService.connect(ftp).then( () => ftpService.putFile(ftp.name != "candyspace" ? moFile : CSFile, ftp.name) );
}
var ftpList = (ftp, moFile, CSFile) => {
  return ftpService.connect(ftp).then( () => ftpService.getFiles(ftp.name) );
}