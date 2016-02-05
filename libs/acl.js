"use strict";
/*
* Module dependencies
*/
var _ = require('lodash');

function acl (db, rol){
	this.db = db;
	this.rol = rol;
}

acl.prototype = {
	verify: function(list){
	  var user = this.db;
	  var rol = this.rol;
	  var verifyRol = function(req, res, next) {
	  	user.findById(req._user, function(err, data){
	  		if(err) res.status(500).send('Internal Server Error');
	  		
	  		if(data !== null) {res.status(404).send('could not find the user');}else{

	  			var permission = _.intersection(rol, list);
	  			var authorized = ( permission.length > 0 ) ? true : false;

	  			// req.authorized = authorized;
				req.db.user = user;

	  			authorized ? next() : res.status(403).send('the role of the user does not have permission to access this resource');
	  		}
	  	});
	  }
	  return verifyRol;
	}
}

exports = module.exports = acl;
