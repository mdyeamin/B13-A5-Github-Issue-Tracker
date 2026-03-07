// get the input value and route the home page
// login form function start
const login = () => {
    const getUserNameFiled = document.getElementById("user-filed");
    const getPasswordFiled = document.getElementById("password-filed");
    const userNameValue = getUserNameFiled.value.trim();
    const passwordValue = getPasswordFiled.value.trim();
    getUserNameFiled.value = "";
    getPasswordFiled.value = "";
    
    if (userNameValue === "admin" && passwordValue === "admin123") {
        alert("Login Successfully");
    window.location.href = "home.html";
  } else {
      alert("Wrong username or password");
    }
};

// get the login button event
document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault();
    login();
});
// login form function end

