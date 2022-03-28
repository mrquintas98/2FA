async function login() {
    try {
        let obj = {
            nome: document.getElementById("nome").value,
            password: document.getElementById("password").value
        }
        let user = await $.ajax({
            url: '/api/users/login',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
        sessionStorage.setItem("userId",user.id_u);
        window.location = "home.html";
    } catch (err) {
        alert("Username ou password errada!")
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
        window.location = "home.html";
    } catch (err) {
        console.log(err);
    }
}