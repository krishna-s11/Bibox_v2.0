const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/user/login",
      data: {
        email,
        password,
      },
    });
    window.location.assign("/dashboard");
    console.log("clicked");
  } catch (err) {
    console.log(err.response.data);
  }
};

document.querySelector(".btn__sign-in").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
  console.log("clicked");
});
