/*!
 * bills
 * Copyright(c) 2016 Juan David Echeverry Rivera
 * MIT Licensed
 */

/*
 * Module dependencies
 */
var fs = require('fs');
var _ = require('lodash');
var assert = require('assert');
var auth = require('./jwt');
var acl = require('./acl');
var db = require('./db');
var mongoose = require('mongoose');
var dir = process.cwd();

/*
* Instances
*/
var list;

/**
 * comentatios test
 *
 * @param {Json} data Contiene info importante
 * @return {String} token decoded.
 * @public
 */

module.exports = function ( app, data ){

  var dba = db(mongoose, data.configure.connect, {default: data.configure.acl.default, rol: data.configure.acl.rol});
  list = new acl(dba, data.configure.acl.rol);

  if(Array.isArray(data.routes)){

    assert( data.configure.jwt.secret, 'word secret is required' );
    assert( data.configure.jwt.day, 'day is required' );

    var authenticate = ( data.configure.authenticate ) ? auth( data.configure.jwt.secret ) : null;

    _.forEach(data.routes, function(route, key) {

      assert( route.route, 'route is required' );
      assert( route.controller.name, 'controller is required' );

      var path = '/' + route.route.toLowerCase();

      _.forEach(route.controller.method, function(method, key) {

        var feature = require(dir + '/api/controllers' + path)[method.feature];
        var means = method.name.toLowerCase();

        if( authenticate ){
          if( method.auth ){
            app[ means ]( path + '/:id?' , authenticate, list.verify(method.acl), feature );
          }else{
            app[ means ]( path + '/:id?' , list.verify(method.acl), feature );
          }
        }else{
          app[ means ]( path + '/:id?', list.verify(method.acl), feature );
        }
      });
    });
  }
}

var authEncode = function(data) {
  return auth.encodeToken(data);
}

module.exports.authEncode = authEncode;
