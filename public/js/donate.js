const donate = async (name, mobile, address) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/user/donate",
      data: {
        name,
        mobile,
        address,
      },
    });
    window.location.assign("/donate_confirm");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

document.querySelector(".btn__sign-in").addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const address = document.getElementById("address").value;
  console.log(name, mobile, address);
  //   donate(name, mobile, address);
});
