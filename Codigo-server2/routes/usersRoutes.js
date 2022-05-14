var express = require('express');
var router = express.Router();
var uModel = require("../models/usersModel");

router.post('/login', async function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  let result = await uModel.login(email, password);
  res.status(result.status).send(result.result);
});

router.post("/adduser", async function (req, res, next) {
  let user = req.body;
  let result = await uModel.AddUser(user);
  res.status(result.status).send(result);
});

router.put("/updatesecrets", async function(req, res, next) {
  let result = await uModel.UpdateSecret();
  res.status(result.status).send(result.result);
});

router.post("/verifytoken", async function (req, res, next) {
  let secret = req.body.secret;
  let email = req.body.email;
  let result = await uModel.VerifyToken(secret,email);
  res.status(result.status).send(result);
});

module.exports = router;