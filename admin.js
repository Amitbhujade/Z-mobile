const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");


//Showing the menu
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})


//closing the menu
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

//changing the theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})


function changePassword(){

    var oldPass = localStorage.getItem('adminpassword');
    var enteredOldPass = document.getElementById('oldpass').value;
    var enteredNewPass = document.getElementById('newpass').value;

    if(oldPass === enteredOldPass && enteredNewPass !== oldPass){
        oldPass = localStorage.setItem('adminpassword', enteredNewPass);
        alert('password change successfully');
    }
    else{
        alert("try again");
    }
}
