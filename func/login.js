// get the input value and route the home page
// login form function start
const login = () => {
  const getUserNameField = document.getElementById("user-filed");
  const getPasswordField = document.getElementById("password-filed");
  const userNameValue = getUserNameField.value.trim();
  const passwordValue = getPasswordField.value.trim();
  getUserNameField.value = "";
  getPasswordField.value = "";

  if (
    userNameValue.toLowerCase() === "admin" &&
    passwordValue.toLowerCase() === "admin123"
  ) {
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
