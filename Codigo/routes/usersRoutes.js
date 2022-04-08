var express = require('express');
var router = express.Router();
var uModel = require("../models/usersModel");
const jwt = require('jsonwebtoken');


router.post('/login', async function (req, res, next) {
  let nome = req.body.nome;
  let password = req.body.password;
  let result = await uModel.login(nome, password);
  res.status(result.status).send(result.result);
 
});

router.post("/adduser", async function (req, res, next) {
  let user = req.body;
  console.log(user);
  let result = await uModel.AddUser(user);
  res.status(result.status).send(result);
});

router.post("/verifytoken", async function (req, res, next) {
  let secret = req.body.secret;
  console.log(secret);
  let result = await uModel.VerifyToken(secret);
  res.status(result.status).send(result);
});


module.exports = router;