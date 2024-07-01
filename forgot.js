


function verifyOTP() {
    var otpEntered = document.getElementById("otp").value;
    var otpStored = localStorage.getItem("otp");
    if (otpEntered === otpStored) {
        // Toggle visibility of OTP form
        let passForm = document.querySelector('.password-form');
        passForm.classList.toggle('active');
        alert("Otp verified... Set the new password");
    } else {
        alert("Incorrect Otp...")
    }
}

function updatePassword() {
    var newPassword = document.getElementById("newPassword").value;
    // Simulated password update
    var pass = localStorage.getItem("password");

    if (pass !== newPassword) {
        localStorage.setItem("password", newPassword);
        console.log("New password set: " + newPassword);

        // Toggle visibility of OTP form
        let loginForm = document.querySelector('.login-form');
        let forgot = document.querySelector('.forgot-form');
        let passForm = document.querySelector('.password-form');
        let otpForm = document.querySelector('.otp-form');
        loginForm.classList.toggle('active');
        forgot.classList.remove('active');
        passForm.classList.remove('active');
        otpForm.classList.toggle('active');
        alert("Password change successfully");
    }
    else {
        alert("set other password")
    }

}


let forgot = document.querySelector('.forgot-form');

document.querySelector('#forgot').onclick = () => {
    forgot.classList.toggle('active');
    menu.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    signupFormCancel.classList.remove('active');
    signupForm.classList.remove('active');
}



// let pass = document.querySelector('.password-form');

// document.querySelector('#newPasswordForm').onclick = () => {
//     pass.classList.toggle('active');
//     onetime.classList.remove('active');
//     forgot.classList.remove('active');
//     menu.classList.remove('active');
//     searchForm.classList.remove('active');
//     shoppingCart.classList.remove('active');
//     loginForm.classList.remove('active');
//     signupFormCancel.classList.remove('active');
//     signupForm.classList.remove('active');
// }