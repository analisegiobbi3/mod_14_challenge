const loginFormHandler = async (event) =>{
    event.preventDefault();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    //fetch allows you to log in with an existing username and password
    if (username && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'},
        })
        if (response.ok){
            document.location.replace('/dashboard');
        }else{
            alert(response.statusText)
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

