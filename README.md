# Bills

bills is a very small library that allows you to load a json file and route what you write in the syntax proposed by the library.

## Installation
```bash
$ npm install --save bills 
```

## api.js
```js
import express from 'express'
import bills from 'bills'

const app = express()
const options = {
  "mainfest": `${process.cwd()}/__test__/routing.json`, // optional
  "adapter": {
    "name": "express",
    "instance": app
  }
}
bills(options)

app.listen(3000)
```