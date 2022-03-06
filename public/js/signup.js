const register = async (name,mobile,email,password) => {
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/user/register',
            data: {
                name,
                mobile,
                email,
                password
            }
        });
        window.location.assign('/dashboard');
    }catch(err){
        console.log(err.response.data);
    }
}

document.querySelector('.btn__sign-in').addEventListener('click', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    register(name,mobile,email,password);
});

