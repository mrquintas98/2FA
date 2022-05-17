var pool = require("./connection");
var nodemailer = require('nodemailer');
var bcrpyt = require('bcrypt');
var salt = 10;

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

module.exports.login = async function (email, password) {
    try {

        let sql1 = "Select use_secret "+
        "from utilizador "+
        "where use_email = $1 ";
        let result3 = await pool.query(sql1,[email]);
  
        const decryptedString = cryptr.decrypt(result3.rows[0].use_secret); 

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'teste.2FA.teste@gmail.com',
          pass: 'Teste2fateste'
        }
      });

        let sql = "Select * from utilizador where use_email = $1 ";
        let result = await pool.query(sql, [email]);

        let passwordb = result.rows[0].use_pass;
        let valor = bcrpyt.compareSync(password,passwordb);
           // delete result.rows[0].use_pass;
           let utilizador = result3.rows[0]; 
        if (result.rows.length > 0 && (email!= '' && valor!= '')){
                
            var mailOptions = {
                    from: 'teste.2FA.teste@gmail.com',
                    to: email,
                    subject: 'Your secret to continue!',
                    text: decryptedString
                };
                
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

              return {
                status: 200,
                result: utilizador
            };
            
            }

            else return { 
                status: 401, 
                result: { msg: "Wrong email or password" } 
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
    let hash = bcrpyt.hashSync(user.use_pass,salt);
   
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
      
    var numero = (Math.floor(100000 + Math.random() * 900000));
    var text = numero.toString();
    const encryptedString = cryptr.encrypt(text); 

    console.log(text);

    let sql1 = "Select use_nome,use_email,use_pass "+
     "from utilizador "+
     "where use_nome = $1 and use_email = $2 and use_pass = $3 ";
    let result1 = await pool.query(sql1, [user.use_nome,user.use_email,user.use_pass]);

    if (result1.rows.length > 0 || (user.use_nome == '' || user.use_email == '' || user.use_pass== '')) {
        return {
            status: 500,
            alert: "Preencha o campo!",
        };        
    }
    
    let sql = "Insert into utilizador(use_nome,use_email,use_pass,use_secret) values($1,$2,$3,$4)";
        result1 = await pool.query(sql, [user.use_nome,user.use_email,hash,encryptedString]);
        let utilizador = result1.rows;     
        
        if(result1.rows.length == 0){
            var mailOptions = {
              from: 'teste.2FA.teste@gmail.com',
              to: user.use_email,
              subject: 'Your secret to continue!',
              text: text
            };
      
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
             
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

module.exports.UpdateSecret = async function (){

    try {
        let utilizador = "select * from utilizador";
        let result = await pool.query(utilizador);

        for (let i = 0; i < result.rows.length; i++) {
                function encryptedString(){
                    var numero = (Math.floor(100000 + Math.random() * 900000));
                    var text = numero.toString();
                    return cryptr.encrypt(text);
                }

            let token = encryptedString();
            try {
                let sql ="update utilizador "+
            "set use_secret = $1 where id_u = $2";
            let result1 = await pool.query(sql,[token,i+1]);
            } catch (error) {
                console.log(err);
            }
        }
        return { 
            status:200 
        };

    } catch(err) {
        console.log(err);
        return {
            status:500, 
            result: err
        };
    }
}

module.exports.VerifyToken = async function (secret,email) {
    
    try {
        let sql1 = "Select use_secret "+
        "from utilizador "+
        "where use_email = $1 ";
        let result = await pool.query(sql1,[email]);
        const decryptedString = cryptr.decrypt(result.rows[0].use_secret); 
      
    if ( decryptedString == secret) {
        return {
            status: 200,
            alert: "Válido!",
        };
        
    }else return {
            status: 400,
            result: {
                msg: "Inválido"
            }
        };

    }catch (err) {
        console.log(err);
        return {
            status: 400,
            alert: "Erro!"
        };
    }

}
