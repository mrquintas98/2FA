async function confirm() {
    try {
        let obj = {
            secret: document.getElementById("secret").value,
            
        }
        let user = await $.ajax({
            url: '/api/users/verifytoken',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
        alert("Secret aceite")
        mywindow = window,close('secret.html');
       
        
       
    } catch (err) {
        alert("Secret errada!")
}
}