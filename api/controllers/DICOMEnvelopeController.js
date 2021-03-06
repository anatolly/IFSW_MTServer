/**
 * DICOM_envelopeController
 *
 * @description :: Server-side logic for managing Dicom_envelopes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


// Reference the dicomParser module
var dicomParser = require('../../externals/dicomParser');

module.exports =
{
 //TODO redesign upload method to avoid saving the local file (parse it as a stream ! )
  upload: function  (req, res) {
    console.log(req.body);
    console.log(req.allParams());

    req.file('dicom_file').upload(function (err, files) {
      if ((err) || (files.length == 0))
        return res.serverError(err);

 // This code reads a DICOM P10 file from disk and creates a UInt8Array from it
      var fs = require('fs');

      var filePath =  files[0].fd; //   'ctimage.dcm';
      var dicomFileAsBuffer = fs.readFileSync(filePath);
      var dicomFileAsByteArray = new Uint8Array(dicomFileAsBuffer);

      // Now that we have the Uint8array, parse it and extract the patient name
      var dataSet = dicomParser.parseDicom(dicomFileAsByteArray);
      //var patientName = dataSet.string('x00100020');
      //console.log('Patient Name = '+ patientName);
      DICOMFactory.createDICOMEnvelope(filePath, dataSet, function(aEnvelope) {

        //TODO implement generation of a proper filename (second parameter)
        return res.json(aEnvelope);
        /*CloudAPI.uploadFile(filePath, filePath, aEnvelope, function (err, file) {

          if (err)  return res.json({Error: 'Error text:' + err });

          console.log("FILE UPLOADED:"+ JSON.stringify(file));
          console.log("FILE UPLOADED METADATA:"+ JSON.stringify(file.metadata));
        
          return res.json({
            message: file.length + ' file(s) uploaded successfully!',
            files: file,
            envelope: aEnvelope
          });
        } )*/
      });
    });
  },

  /*find: function (req, res) {
    DICOMEnvelope.find(req.params.all(), function (err, envelopes) {

      return res.json({
        envelopes: JSON.stringify(envelopes)
      });

    });
  },*/

  download: function (req, res) {
    console.log(req.params.all());

    DICOMEnvelope.find(req.params.all(), function (err, envelopes) {

      console.log(envelopes);

      if (err)
      {
        return res.json({Error: 'Error text:' + err });
      }
      else {
        /*
        CloudAPI.downloadFile(envelopes[0].DICOMObjectID,     function (err, file) {
            if(err)
            {
              console.log('Error during download of the file from the cloud. Error:'+ err);
              res.statusCode = 404;
              res.send("!!!!!!!!!!!!!!!!!!!!!");
              res.send('404 error: ' + err);
              return res.end();

            }
            else
            {
              // check metadata
              console.log('Meta data of the downloaded file:'+ JSON.stringify(file.metadata));
              console.log('the downloaded file:'+ JSON.stringify(file));
              res.contentType("application/octet-stream");
              res.set("Content-Disposition", "attachment; filename=IFSW_DICOMObject_ID_" + envelopes[0].id + ".dcm");
              //res.set("Content-Length","132914");
              //res.set("ETag","758367725");
              //alternative to setup headers - res.setHeader('Content-disposition', 'attachment; filename=test.jpg')
             //TODO reimplement without creating local file !
              fs.createReadStream(file.name).pipe(res);
            }
          }
        );*/ return res.json(envelopes[0]);
      }
    });
  }

};

