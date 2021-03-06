/**
* DICOM_envelope.js
*
* @description :: DICOM Envelope contains meta-data and a reference to the actual DICOM object.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports =
{

  // see for the full list of atributes the URL: https://rawgit.com/chafey/dicomParser/master/examples/dragAndDropParse/index.html
  attributes:
  {

    toJSON: function() {

      var object = this.toObject();
      unk1 = JSON.parse(object.unknownDICOMDictionaryAttributes);
      unk2 = JSON.parse(object.unknownIFSWAttributes);

      object.unknownDICOMDictionaryAttributes = unk1;
      object.unknownIFSWAttributes = unk2;
      return object;

    },

    unknownDICOMDictionaryAttributes: 'string', // a JSON -encoded hash of unknown attributes for DICOM Dictionary
    unknownIFSWAttributes: 'string', // a JSON -encoded hash of unknown attributes for IFSW system

    patientName: 'string',
    patientDOB: 'date', // DOB = Date of Birth
    patientSex: { type: 'string', enum: ['male','female']},
    PatientID: 'string',

    studyID: 'string',
    studyDate: 'date',
    studyTime: 'datetime',
    StudyDescription: 'string',
    studyAccesssion_n: 'integer',
    studyProtocolName: 'string',

    seriesDescr: 'string',
    seriesModality: 'string',
    seriesDate: 'date',
    series_n: 'integer',
    seriesBodyPart: 'string',
    seriesTime: 'datetime',

    instance_n: 'integer',
    instanceAcquisitionDate: 'date',
    instanceContentDate: 'date',
    instanceAcquisition_n: 'integer',
    instanceAcquisitionTime: 'datetime',
    instanceContentTime: 'datetime',

    // TODO DICOM image section should be defined

    equipmentManufacturer: 'string',
    equipmentStationName: 'string',
    equipmentInstitutionName: 'string',
    equipmentSoftwareVersion: 'string',
    equipmentImplementationVersionName: 'string',
    equipmentModel: 'string',
    equipmentAETitle: 'string',


    // IFSW specific data
    DICOMObjectID: 'string'
  }
};

