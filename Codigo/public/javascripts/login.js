async function login() {
    try {
        let obj = {
            nome: document.getElementById("nome").value,
            password:document.getElementById("password").value
        }
        let user = await $.ajax({
            url: '/api/users/login',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
        
        window.location.href = 'home.html';
       
    } catch (err) {
        alert("Preencha os campos ou o Username e a password estão erradas!")
}
}

async function addUser() {
    try {
        let users = {
            
           use_nome: document.getElementById("nome_1").value,
           use_email: document.getElementById("email").value,
           use_pass: document.getElementById("password_1").value,      
           
        } 
        
        let result = await $.ajax({
            url: "/api/users/adduser",
            method: "post",
            dataType: "json",
            data: JSON.stringify(users),
            contentType: "application/json"
        });
    
        alert("Conta criada")
    mywindow = window,open('secret.html', '_blank', 'height=500,width=500');
    window.location.reload();
    
    } catch (err) {
        alert("Preencha os campos ou o email já está a ser utilizado por outro utilizador!");
    }
}