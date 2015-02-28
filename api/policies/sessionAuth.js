/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  //console.log('policy:');
  //console.log (req.session.activeUser);
  //console.log (req.session.activeUserServerPermissions);

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if ((req.session.activeUserServerPermissions != null) && (req.session.activeUserServerPermissions.authenticatedToEverything == true)) {
    //TODO: заменить authenticatedToEverything на различные права для различных операций. Дописать код в UserController. 
    //Хороший пример: http://sailsjs.org/#/documentation/concepts/Policies
    //console.log('policy: authenticated');

    return next();
  }

  //console.log('policy: forbidden');

  //Not permitted to perform this action, therefore 'forbidden'
  return res.forbidden();
};
