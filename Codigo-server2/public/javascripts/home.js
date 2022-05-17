var Emailid = sessionStorage.getItem("email-login");

window.onload = function(){
    if(Emailid){
        let html= `<header>
        <div class="wrapper">
            <div class="logo">
               
            </div>
    <ul class="nav-area">
    <li><a href="home.html">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a  onclick="logout()">Log Out</a></li>
    </ul>
    </div>
    <div class="welcome-text">
            <h1>
    Tattoo <span>Art</span></h1>
    <a href="./files/TattooArt.apk" download='TattooArt' class="download-btn">Download Apk
    <i class="fa fa-download"></i>
    </header>`

      document.getElementById("main").innerHTML = html;
    }
    else{
       
        swal("Error!", "Faça Login Primeiro", "error")  
        .then((value) => {
            window.location.href='index.html'         
    });
    
    }
}

function logout (){
    sessionStorage.removeItem("email-login");
    window.location = "index.html";
}