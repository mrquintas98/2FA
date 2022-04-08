var pool = require("./connection");
var nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const SECRET = crypto.randomBytes(10).toString('base64');


module.exports.login = async function (nome, password) {
    try {
        let sql = "Select * from utilizador where use_nome = $1 and use_pass = $2";
        let result = await pool.query(sql, [nome, password]);
        if (result.rows.length > 0 && (nome != '' && password!= ''))
        return {
                status: 200,
                result: result.rows[0]
            };
    
        else  return {
            status: 400,
            result: {
                msg: "Nome ou password incorreta"
            }
        };
        
    } catch (err) {
        console.log(err);

        return {
            status: 500,
            result: err
        };
    }
}

module.exports.AddUser = async function (user) {

    try {
       
        let sql3 = "Select * from utilizador where use_secret= $1";
        let result3 = await pool.query(sql3,[user.use_secret]);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'teste.2FA.teste@gmail.com',
          pass: 'Teste2fateste'
        }
      });

      const token = jwt.sign(user.use_nome, SECRET);
      const secret = crypto.randomBytes(10).toString('base64');
          
      user.use_secret = secret;


    let sql1 = "Select  * from utilizador where use_email = $1";
    let result1 = await pool.query(sql1, [user.use_email]);

    if (result1.rows.length > 0 && (user.use_email== '')) {
        return {
            status: 500,
            alert: "Preencha o campo!",
        };        
    }
    
    let sql = "Insert into utilizador(use_nome,use_email,use_pass,use_secret) values($1,$2,$3,$4)";
        let result = await pool.query(sql, [user.use_nome,user.use_email,user.use_pass,user.use_secret]);
        let utilizador = result.rows;     
        
        if(result.rows.length == 0){
            var mailOptions = {
              from: 'teste.2FA.teste@gmail.com',
              to: user.use_email,
              subject: 'Your secret to continue!',
              text: secret
            };
      
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
      
          console.log(token);
          console.log(secret);
          console.log(user.use_secret);
          }
      

        return {
            status: 200,
            result: utilizador
        };
        
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.VerifyToken = async function (secret) {
    
    try {
        let sql1 = "Select  * from utilizador where use_secret = $1 ";
        let result = await pool.query(sql1,[secret]);

    if ( result.rows.length > 0) {
        return {
            status: 200,
            alert: "Válido!",
        };
        
    }

    if ( result.rows.length == 0) {
        return {
            status: 400,
            alert: "Inválido!",
        };
        
    }
console.log(secret);
    }catch (err) {
        console.log(err);
        return {
            status: 400,
            alert: "Erro!"
        };
    }

}

