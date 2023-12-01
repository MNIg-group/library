loginPage = document.getElementById('LoginPage');
loginBtn = document.getElementById('login-btn');
signupPage = document.getElementById('SignupPage');
signupBtn = document.getElementById('signup-btn');

signupForm = document.getElementById('signup-form');
loginForm = document.getElementById('login-form');


signupForm.addEventListener('submit', (e) =>
{
    e.preventDefault();
    signupPage.classList.remove('show');
    loginPage.classList.add('show');
})
