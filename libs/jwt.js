/*!
 * jwt-parser
 * Copyright(c) 2016 Juan David Echeverry Rivera
 * MIT Licensed
 */

/*
* Module dependencies
*/
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function ( secret ){

  var isAuthenticated = function(req, res, next) {

    if(!req.headers.authorization) {
      return res
        .status(403)
        .send({message: "Your request has no authorization header"});
    }

    //var token = req.headers.authorization.split(" ")[1]; // en caso de usar el estandar Bearer
    var token = req.headers.authorization; // sin el estandar

    try {
      var payload = decodeToken( token, secret );
      var _id = payload.sub;

      req.db.user.findById(_id, function(err, data){
        if(err) res.status(500).send('Your request has a corrupted token');
        if(!data.access) res.status(401).send('Unconfirmed User');
      });

    }catch (err) {
      return res
         .status(500)
         .send({message: "Your request has an invalid token"});
    }

    if(payload.exp <= moment().unix()) {
       return res
          .status(401)
          .send({message: "The token has expired"});
    }
    req._user = payload.sub;
    next();
  }
  return isAuthenticated;
}

/**
 * Decodes a token and returns
 *
 * @param {String} app express.
 * @param {string} This is the token that contains the user data.
 * @return {String} token decoded.
 * @private
 */
var decodeToken = function( token, secret ){
  return jwt.decode( token, secret );
}

/**
 * Create a new token and returns
 *
 * @param {String} app express
 * @param {string} This is the identifier of the user in the model.
 * @return {String} token encoded
 * @public
 */
var encodeToken = function(data) {
   var payload = {
     sub: data._id,
     iat: moment().unix(),
     exp: moment().add(day, "days").unix(),
   };
   return jwt.encode(payload, secret);
}

module.exports.encodeToken = encodeToken;
