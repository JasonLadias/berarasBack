//const http = require('http');

const express = require('express');
const bodyParser = require('body-parser')


const app = express();

const Routes = require('./Routes/routes')

app.use(bodyParser.urlencoded({extended:true}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(Routes)

app.use((req, res, next) => {
    res.send(JSON.stringify({status : "Error", type : "1", reason : "Bad Endpoint Request"}))
});


app.listen(8080)
