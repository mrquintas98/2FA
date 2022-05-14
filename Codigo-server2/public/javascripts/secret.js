async function confirm() {
    try {
        let obj = {
            secret: document.getElementById("secret").value,
            email: sessionStorage.getItem('email-register'),
        }
       
        let user = await $.ajax({
            url: '/api/users/verifytoken',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });

        swal("Sucesso", "Secret Aceite", "success")
        .then((value) => {
            window.location.href='home.html'
            
        });   


} catch (err) {
    swal("Erro!", "A secret que digitou está errada ou o tempo expirou! Tente fazer login novamente", "error")
    }
}


async function confirm_login() {
    try {
        let obj = {
            secret: document.getElementById("secret").value,
            email: sessionStorage.getItem('email-login'),           
        }
       
        let user = await $.ajax({
            url: '/api/users/verifytoken',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });

        swal("Sucesso", "Secret Aceite", "success")
        .then((value) => {
            window.location.href='home.html'
            
        });   


} catch (err) {
    swal("Erro!", "A secret que digitou está errada ou o tempo expirou! Tente fazer login novamente!", "error")
    }
}

