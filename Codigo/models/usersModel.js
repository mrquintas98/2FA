var pool = require("./connection");
/*const {authenticator} = require('otplib') ;
const crypto = require('crypto');
const qrcode = require('qrcode');*/

module.exports.login = async function (nome, password) {
    try {
        let sql = "Select * from utilizador where use_nome = $1 and use_pass = $2";
        let result = await pool.query(sql, [nome, password]);
        if (result.rows.length > 0)
            return {
                status: 200,
                result: result.rows[0]
            };
        else return {
            status: 401,
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
   
    
   /* generateSecret: ()=> authenticator.generateSecret(),
    generateToken: (secret) => authenticator.generate(secret),
    verify: (token, secret)=> authenticator.verify({secret, token}),
    generateQRCode: (user, secret) => {

        const otp = authenticator.keyuri(user, "Our TFA App", secret);
        let imagePath = '';

        qrcode.toDataURL(otp, (err, imageUrl) => {
            if (err) {
                console.log('Could not generate QR code', err);
                return;
            }
            imagePath = imageUrl;
        });
        return imagePath;

    }*/



    try {

    let sql1 = "Select * from utilizador where use_email = $1";
    let result1 = await pool.query(sql1, [user.use_email]);

    if (result1.rows.length > 0) {
        return {
            status: 500,
            result: {
                msg: "Email ja utilizado"
            }
              
        };
        
    }
        let sql = "Insert into utilizador(use_nome,use_email,use_pass) values($1,$2,$3)";
        let result = await pool.query(sql, [user.use_nome,user.use_email,user.use_pass]);
        let utilizador = result.rows;
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
