const logout = async () => {
    try{
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:3000/api/user/logout',
        });
        console.log('reloading');
        window.location.assign('/signin');
    }catch(err){
        console.log(err);
    }
};

document.querySelector('.sign-out').addEventListener('click', e => {
    e.preventDefault();
    logout();
})