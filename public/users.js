
var signUpForm = document.getElementById("sign-up-form");
var logInForm = document.getElementById("log-in-form");
var loginButton = document.getElementById("log-in-button");
var signUpButton = document.getElementById("sign-up-button");
var createAccountButton = document.getElementById("create-account-button");
var authBox = document.getElementById("auth-box");
var existingMember = document.getElementById('existing-member');
var signUpBox = document.getElementById("sign-up");
var userName = document.getElementById("sign-up-username");
var userEmail = document.getElementById("sign-up-email");
var userPassword = document.getElementById("sign-up-password");
var loginEmail = document.getElementById("login-email");
var loginPw = document.getElementById("login-password");
var user = document.getElementById("name-for-schedule");
var hours = document.getElementById("hours-for-schedule");
var event = document.getElementById("event-for-schedule");
var time = document.getElementById("time-for-schedule");
var scheduleShow = document.getElementById("show-schedule");


function showLoginForm(){
    
    signUpButton.style.setProperty("display","none");
    signUpBox.style.setProperty("display","none");
    loginButton.style.setProperty("display","none");
    authBox.style.setProperty("display","block");
    logInForm.style.setProperty("display","block");
}

function showSignUpForm(){
    existingMember.style.setProperty("display","none");
    signUpButton.style.setProperty("display","none");
    createAccountButton.style.setProperty("display","block");
    loginButton.style.setProperty("display","none");
    authBox.style.setProperty("display","block");
    signUpForm.style.setProperty("display","block");
}

function cancel(){
    location.reload();
}

function createNewAccount(){
    axios.post('/auth/register', { username: userName.value, email: userEmail.value, password: userPassword.value }).then(function(response) {
        var user = response.data.username;
        console.log(user);
        alert(`Account created for ${user}`);
        location.reload();
        alert("please login after creating account");
    }).catch(function(){
        alert(`Error in loggin in`);
    });
}

function loginToExistingAccount(){
    axios.post('/auth/login',{email:loginEmail.value,password:loginPw.value}).then(function(response){
        console.log(response.data);
        alert('success');
        window.location = response.data.URL;
    }).catch(function(err){
        console.log(err);
    });
}


function HomeButton(){
    document.getElementById("home-button").onclick = function () {
        location.href = "#";
    };

}



