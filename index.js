/*!
 * bills
 * Copyright(c) 2016 Juan David Echeverry @juandav
 * MIT Licensed
 */

'use strict';

module.exports = require('./libs/bills');
/*
var express = require('express');
var app = express();

var bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var algo = require('./libs/bills');

var json = {
  "configure":{
    "connect": "mongodb://127.0.0.1:27017/cms",
    "authenticate": true,
    "acl": {
      "default": "Visitor",
      "rol":["Admin", "Moderator", "Visitor"]
    },
    "jwt":{
      "secret": "wordSecret",
      "day": "5"
    }
  },
  "routes":[
    {
      "route": "MENU",
      "controller":{
        "name": "MENU",
        "method": [
          {
            "name": "GET",
            "feature": "allBills",
            "auth": true,
            "acl": ["Admin", "Moderator", "Visitor"]
          },
          {
            "name": "POST",
            "feature": "createBills",
            "auth": false,
            "acl": ["Admin"]
          },
          {
            "name": "PUT",
            "feature": "updateBills",
            "auth": false,
            "acl": ["Admin"]
          },
          {
            "name": "DELETE",
            "feature": "deleteBills",
            "auth": true,
            "acl": ["Admin"]
          }
        ]
      }
    }
  ]
};

algo(app, json);
app.listen(3000, function(){
  console.log('escuchando en el puerto 3000');
});
*/


/*
 ./Controllers/bills.js

 'use strict';
 
  var cms = module.exports;

  cms.allBills = function (req, res, next){
    res.send('test');
  }
  cms.createBills = function (req, res, next){
    res.send('test');
  }
  cms.updateBills = function (req, res, next){
    res.send('test');
  }
  cms.deleteBills = function (req, res, next){
    res.send('test');
  }
*/