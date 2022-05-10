var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/usersRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users',userRouter);

var cronJob = require("cron").CronJob;
const axios = require('axios');

new cronJob("*/30 * * * * *", function(){
    console.log("Refresh Secrets");

    axios.put('http://localhost:3000/api/users/updatesecrets', {
        todo: 'Update Secrets'
    })
    .then(res => {
       // console.log(`statusCode: ${res.status}`)
    })
    .catch(error => {
        console.error(error)
    })
    
},null, true);



module.exports = app;

