// login.js

// Login functionality
function login() {
    var storedEmail = localStorage.getItem('email');
    var storedPassword = localStorage.getItem('password');
    var enteredEmail = document.getElementById('emailAdd').value;
    var enteredPassword = document.getElementById('userPw').value;
    var name = localStorage.getItem('name');
    var name2 = localStorage.getItem('name2');

    // Check if entered email and password match stored email and password
    if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
        // If the user is logged in, display the name next to the profile icon
        alert('Login successful');
        document.querySelector('.login-form').classList.remove('active');
        document.getElementById('profileName').textContent = name;
        document.getElementById('profileName2').textContent = name2;
        document.getElementById('profileEmail').textContent = storedEmail;
        document.getElementById('profile').style.display = 'block';

        // Store login state in localStorage
        localStorage.setItem('loggedIn', 'true');
    } else {
        // Display an error message or perform other actions if login fails
        alert('Invalid email or password');
        document.getElementById('profile').style.display = 'none';
    }

    // Retrieve the name from local storage
    var storedName = localStorage.getItem('name');

    // Check if the name exists
    if (storedName) {
        // Set the retrieved name as the text content of profileName2 span
        document.getElementById('profileName2').textContent = storedName;
    }
}

// Logout functionality
function logout() {
    // Clear user authentication data from localStorage
    // localStorage.removeItem('email');
    // localStorage.removeItem('password');
    // localStorage.removeItem('name');
    // localStorage.removeItem('name2');
    localStorage.removeItem('loggedIn');

    // Optionally, perform additional actions such as redirecting to a login page or updating the UI
    window.location.href = 'index.html'; // Redirect to the login page after logout
}

// Check login state on page load
document.addEventListener('DOMContentLoaded', function () {
    var loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn === 'true') {
        // If user is logged in, display the profile
        var storedEmail = localStorage.getItem('email');
        var name = localStorage.getItem('name');
        var dob = localStorage.getItem('dob');
        var gender = localStorage.getItem('gender');
        var mobile = localStorage.getItem('mobile');

        document.getElementById('profileName').textContent = name;
        document.getElementById('profileName2').textContent = name;
        document.getElementById('profileEmail').textContent = storedEmail;
        document.getElementById('profile').style.display = 'block';

        document.getElementById('profileName3').textContent = name;
        document.getElementById('profileEmail2').textContent = storedEmail;
        document.getElementById('dateofbirth').textContent = dob;
        document.getElementById('gender1').textContent = gender;
        document.getElementById('mobile1').textContent = mobile;
    }
});

function move(){
    window.location.href = 'userdata.html';
}

function editData(){
    window.location.href = 'edituserdata.html';
}

