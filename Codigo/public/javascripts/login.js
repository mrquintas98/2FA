
async function login() {
    try {
        let obj = {
            email: document.getElementById("email1").value,
            password:document.getElementById("password").value
        }

        sessionStorage.setItem('email-login', obj.email);

        let user = await $.ajax({
            url: '/api/users/login',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });

        swal("Sucesso", "Credenciais Aceites", "success")  
        .then((value) => {
            let html= "";

            html+= `<br><br><form  class="sign-in-form">
            <div class="input-field">
                <i class="fas fa-key"></i>
                <input type="text" placeholder="Secret" id="secret" required/>
            </div>
                <input type="button" onclick="confirm_login()" value="Confirmar" class="btn solid" >
        </form>`

            document.getElementById("popup").innerHTML = html;
    });
    
    } catch (err) {
        swal ( "Erro!" , "Preencha de novo os campos!" ,  "error" )
        }
}

async function addUser() {
    try {
        let users = {        
           use_nome: document.getElementById("nome_1").value,
           use_email: document.getElementById("email").value,
           use_pass: document.getElementById("password_1").value,               
        } 

        sessionStorage.setItem('email-register', users.use_email);
        
        let result = await $.ajax({
            url: "/api/users/adduser",
            method: "post",
            dataType: "json",
            data: JSON.stringify(users),
            contentType: "application/json"
        });

         swal("Sucesso", "Conta Criada", "success")
        .then((value) => {   
        let html= "";

        html+= `<br><br><form  class="sign-in-form">
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Token" id="secret" required/>
                    </div>
                        <input type="button" onclick="confirm()" value="Confirmar" class="btn solid" >
                </form>`

      document.getElementById("popup2").innerHTML = html;
});
    
    } catch (err) {
        swal ( "Erro!" ,  "Preencha de novo os campos!" ,  "error" );
    }
}