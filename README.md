# Bills


  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]

## api.js
```js
import fs from 'fs';
import express from 'express';
import bills from 'bills';

const app = express();
const router = JSON.parse(fs.readFileSync(__dirname + '/router.json').toString());

bills(app, router);

app.listen(3000)
```

## router.json
``` json
"configure":{
    "connect": "mongodb://127.0.0.1:27017/your_database",
    "authenticate": true,
    "acl": {
      "default": "Visitor",
      "rol":["Admin", "Visitor"]
    },
    "jwt":{
      "secret": "my_word_secret",
      "day": "days_expire"
    }
  },
  "routes":[
    {
      "route": "TEST",
      "controller":{
        "name": "TEST",
        "method": [
          {
            "name": "GET",
            "feature": "allTest",
            "auth": true,
            "acl": ["Admin", "Visitor"]
          },
          {
            "name": "POST",
            "feature": "createTest",
            "auth": false,
            "acl": ["Admin"]
          },
          {
            "name": "PUT",
            "feature": "updateTest",
            "auth": false,
            "acl": ["Admin"]
          },
          {
            "name": "DELETE",
            "feature": "deleteTest",
            "auth": true,
            "acl": ["Admin"]
          }
        ]
      }
    }
```

## Collection user:  internal settings

``` js
user : {
   name: String,
    user: { type: String, required: true },
    pass: String,
    email: Array,
    access: { type: Boolean, default: false },
    verify: { type: Boolean, default: false },
    rol: {type: Array, enum: data.rol, default: data.default},
    date: {type:Date, default: new Date()}
}
``` 

### Accessing the user collection
``` js
let user = req.db.user;
``` 

## Installation

```bash
$ npm install --save bills 
```