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
app.use(function(req, res) {
    res.redirect('/');
});

var cronJob = require("cron").CronJob;
const axios = require('axios');
var ping = require('ping');
var http = require("http");
const { Console } = require('console');

function updateTokens() {

    axios.put('http://localhost:3000/api/users/updatesecrets', {
                    todo: 'REFRESH TOKENS'
                  })
                  .then(res => {
                    /*console.log(`statusCode: ${res.status}`)*/
                    /*console.log(res)*/
                  })
                  .catch(error => {
                    console.error(error)
                  })

}


new cronJob("*/30 * * * * *", async function() {

    //check ping
    const result = await ping.promise.probe('10.0.1.5', {
        timeout: 10,
        //extra: ["-i", "2"],
      });
    console.log("Ping server01: "+result.alive);

    var options = {
        host: '10.0.1.5',
        port: 3000
    
    };
    
    if(!result.alive) {
        updateTokens();
    }

    if(result.alive) {
        /*http.get(options, function (res) {
            console.log(res.statusCode);
            //check http
            if( res.statusCode == 200 ) {
                console.log("server01 running!");
                }
                else {
                    updateTokens();
                }
        });*/
        console.log("Servidor principal: Ativo");
    }

    /*process.on('uncaughtException',function(error){
        console.log("server01 http down!");
        updateTokens();
      });*/
    

}, null, true);























//new cronJob("*/30 * * * * *", function(){
 /*   console.log("Refresh Secrets");

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
*/


module.exports = app;

