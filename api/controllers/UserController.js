/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

////////////////////////////////////////////////////////////////

function setActiveUserToSession(req, activeUser) {
  req.session.activeUser = activeUser;
  req.session.activeUserServerPermissions = {
    authenticatedToEverything: true
  };
}

function simpleClone(obj) {
  var result = {};
  Object.keys(obj).forEach(function(key){
    var value = obj[key];
    result[key] = value;
  });
  return result;
}

////////////////////////////////////////////////////////////////

module.exports = {
  
  find: function(req, res) {
    console.log('user.find');

    var blueprintFind = require("../../node_modules/sails/lib/hooks/blueprints/actions/find");
    blueprintFind(req, res);

    res.set({
      'TolikMadeIt': 'true',
      'Cache-Control': 'max-age=0',
      'Expires': 'Sun, 19 Nov 1978 05:00:00 GMT',
      'ETag': Date.now()
    });

    return res;

  },

  findPopulated: function (req, res) {

    //удаление 'id=undefined' из параметров - sails добавляет его для всех вызовов всех функций, кроме единственного ".../user/" для получения всего списка
    var params = {};
    Object.keys(req.params.all()).forEach(function(key){
      var value = req.param(key);
      if ((key == 'id') && (value == undefined))
        return;
      params[key] = value;
    });

    //User.find(req.params.all()).populate('requests').populate('documents').exec(function (err, users) {
    User.find(params).populateAll().exec(function (err, users) {
      var result = [];
      for (i=0; i<users.length; i++) {
        users[i].requests2 = [{name:"1"}];
        //result.push(users[i].toJSON());
        result.push(simpleClone(users[i]));
      }


      var s = JSON.stringify(result, undefined, 2);
      console.log(s);


      /*async.each(result, function(user, cb) {
       var user2 = user;//.toObject();
       //console.log(user2);
       //result.push(user2);
       //console.log(user2.requests);
       //user2.requests = [];
       function newObj(){
       this.name = "!!!!!";
       };
       user2.requests2 = [{name:"1"}, new newObj()];
       async.each(user.requests, function(request, cb2) {
       //user2.requests.push(request.toObject());
       RequestedService.find({parentRequest:request.id}).populate('baseService').exec(function (err, reqServices) {
       //request.services = reqServices;

       //request.services2 = reqServices;
       //console.log("---------------");
       //console.log(request);
       cb2();
       });
       },
       function(err) {
       cb();
       //console.log(result);
       });
       },*/
      //function(err) {
      //return res.json(result);
      return res.json(users);
      //});
      //users[1].requests.add(1);
      //users[1].requests.add({name:"!!!!!!!!!!!!!!!!! 3"});
      //users[1].save(function(){
      //console.log(users[1]);
      //});

      /*RequestedService.find().exec(function (err, reqServices) {
       //reqServices[1].baseService = 2;
       Service.create({name:"!!!!", description:"!!!!!"}).exec(function(error, newService){
       reqServices[1].baseService = newService;
       //reqServices[1].baseService.add({name:"!!!!", description:"!!!!!"});
       reqServices[1].save();
       console.log(reqServices[1].baseService);
       });
       });*/

    });
  },

  //////////////////// Functions for login: getActiveUser(used as amILoggedIn too), getUsersListToLogin, login, logout, signup ///////////////////////////////////

  ////////////////////////////////////////////////////////////////

  //Эта функция работает так: в 'config\policies' она не доступна публично, только через 'api\policies\isAuthenticated',
  //а значит ответ в случае неудачи будет: 'return res.forbidden('You are not permitted to perform this action.');'
  getActiveUser: function(req, res) {
    console.log('getActiveUser');

    // При запросе сюда выполнение попадет, если пройдет 'api\policies\isAuthenticated', (как и функция amILoggedIn выше)
    // а значит пользователь залогинен и не надо проверять req.session.activeUser != null

    //Далее хотя activeUser уже установлен в сессии, все равно обновляем его, т.к. вдруг он обновился в БД и возвращаем клиенту точно корректную информацию
    User.findOne({
      id: req.session.activeUser.id
    })
    .exec(function(err, activeUser) {
      if (err)
         return res.negotiate(err);

      setActiveUserToSession(req, activeUser);

      return res.ok(req.session.activeUser);

    });
  },

  ////////////////////////////////////////////////////////////////

  //TODO
  //!!! Переделать потом эту функцию: режим "логин только по Логин/Пароль" - это стандарт.
  //!!! Режим Список пользователей(userID из attemptUser + пароль - возможен, но только для авторизованных компаний,
  //!!! поэтому еще должен быть параметр RegisteredCompanyComputerID(Hash), который берется с Local BMS Server
  //!!! НО ID - в любом случае не возвращать! вместо него login/email
  getUsersListToLogin: function (req, res) {
    console.log('getUsersListToLogin');
    return User.getUsersListToLogin(function (err, users) {
      if (err)
         return res.negotiate(err);

      //users.push({id:9999999, Name: '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'});

      res.set({
        'TolikMadeIt': 'true',
        'Cache-Control': 'max-age=0',
        'Expires': 'Sun, 19 Nov 1978 05:00:00 GMT',
        'ETag': Date.now()
      });


      return res.ok(users);
    });
  },

  ////////////////////////////////////////////////////////////////

  login: function (req, res) {
    return User.attemptLogin({
      //TODO: Change userID to login: req.param('login'),
      //id: req.param('id'),
      login: req.param('login'),
      password: req.param('password')
    }, function (err, newActiveUser) {
      if (err)
         return res.negotiate(err);

      if (!newActiveUser) {
        return res.badRequest(req.__('User.Login: Invalid username/password combination'));
      }

      setActiveUserToSession(req, newActiveUser);
      
      //if (req.wantsJSON) {
      //}
      return res.ok(newActiveUser);

    });
  },

  ////////////////////////////////////////////////////////////////

  logout: function (req, res) {
    req.session.activeUser = null;
    req.session.activeUserServerPermissions = null;

    return res.ok();
  }

  ////////////////////////////////////////////////////////////////

  /*signup: function (req, res) {
    User.signup({
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password')
    }, function (err, user) {
      // res.negotiate() will determine if this is a validation error
      // or some kind of unexpected server error, then call `res.badRequest()`
      // or `res.serverError()` accordingly.
      if (err) return res.negotiate(err);

      // Go ahead and log this user in as well.
      // We do this by "remembering" the user in the session.
      // Subsequent requests from this user agent will have `req.session.me` set.
      req.session.userID = user.id;
      req.session.authenticated = true;

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the signup was successful.
      if (req.wantsJSON) {
        return res.ok('Signup successful');
      }
      // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
      return res.send('Signup successful');
    });
  }*/

  ////////////////////////////////////////////////////////////////

};

