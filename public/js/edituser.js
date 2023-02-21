const editUserHandler = async (event) =>{
    event.preventDefault();
    let userName = document.querySelector('input[name="username"]').value.trim();
    let password = document.querySelector('input[name="password"]').value.trim();
    let userId = document.querySelector('input[name="user-id"]').value.trim();

    if (userName.length){
        userName = '"username": "' + userName + '"'
    }

    if (!password.length){
        alert('Please enter a password')
    }else{
        password = '"password": "' + password + '"'
    }

    let updateUserInfo = '{' + [userName, password].filter(value => value).join(',') + '}'
    updateUserInfo = JSON.parse(updateUserInfo)



    const response = await(`/api/users/${userId}`, {
        method: 'POST',
        body: JSON.stringify(updateUserInfo),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard')
    }else{
        alert(response.statusText);
    }
}

document.querySelector('.edit-user').addEventListener('submit', postHandler);