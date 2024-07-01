
//store the email and password for admin into the local storage
var email = 'admin@gmail.com';
var password = '123456';

localStorage.setItem("adminemail", email);
localStorage.setItem("adminpassword", password);

//fuction to access the admin page 
function adminLogin() {
    var email1 = localStorage.getItem('adminemail');
    var password1 = localStorage.getItem('adminpassword');
    var enteredEmail = document.getElementById('email-admin').value;
    var enteredPassword = document.getElementById('pass-admin').value;

    if (email1 === enteredEmail && password1 === enteredPassword) {
        window.location.href = 'admin.html';
        alert("admin login successfully");

        // Store login state in localStorage
        localStorage.setItem('adminLoggedIn', 'true');
    }
    else {
        alert("Wrong email or password...");
    }
}


// Check login state on page load
document.addEventListener('DOMContentLoaded', function () {
    var loggedIn = localStorage.getItem('adminLoggedIn');

    if (loggedIn === 'true') {
        // If user is logged in, display the profile
        var storedEmail = localStorage.getItem('adminemail');

        document.getElementById('adminemail').textContent = storedEmail;
    }
});

function adminLogout(){
    localStorage.removeItem('adminLoggedIn');
    alert('admin logged out successfully');
    window.location.href = 'adminlogin.html';
}