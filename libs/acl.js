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
	  		if(err){res.status(500).send('Internal Server Error');}
	  		if(data === null) {res.status(500).send('Internal Server Error');}else{

	  			var permission = _.intersection(rol, list);
	  			var authorized = ( permission.length > 0 ) ? true : false; 
	  			
	  			req.authorized = authorized;

	  			if( authorized ){
	  				next();
	  			}else{
	  				res.status(401).send('unauthorized resource for this user');
	  			}
	  		}
	  	});
	  }
	  return verifyRol;
	}
}

exports = module.exports = acl;