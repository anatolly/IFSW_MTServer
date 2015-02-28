/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'users',

  schema: true,

  attributes: {
  	id: {
           type: 'integer',
           //columnName: 'ID',
           primaryKey: true,
           required: true
        },

        name: 'string',
        DOB: 'date', // DOB = Date of Birth
        sex: { type: 'string', enum: ['male','female']},
        requests: {
          collection: 'Request',
          via: 'owner'
        },
        documents: {
          collection: 'Document',
          via: 'owner'
        },

  	//!!!!! Login/email
  	password: 'string',

  	toJSON: function() {
    	   var obj = this.toObject();
           delete obj.password;
           return obj;
        },
  },

  autoCreatedAt: false,
  autoUpdatedAt: false,
  
  getUsersListToLogin: function (cb) {
    return User.find(
      {select: ['id','Name']}
    )
    .exec(cb);
  },

  //Check validness of a login using the provided inputs.
  //Функция сделана так, что настоящий пароль даже на сервер не отправляется, мы знаем только результат проверки
  attemptLogin: function (params, cb) {
    User.findOne({
      //id: params.id,
      name: params.login,
      //password: INCRYPT params.password
      password: params.password
    })
    .exec(cb);
  }

  /*signup: function (inputs, cb) {
    User.create({
      name: inputs.name,
      email: inputs.email,
      
      password: inputs.password //don't forget to encrypt the password first
    })
    .exec(cb);
  }*/

  //Шпаргалка пока:
  //User.query('SELECT id, name FROM users WHERE Deleted = 0', cb);

};
