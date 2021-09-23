const welcomeEl = document.getElementById("welcome-el")

// Give the function a parameter, greeting, that replaces "Welcome back"
function greetUser(grettings) {
    welcomeEl.textContent = grettings + ", Per Harald Borgen 👋"
}

greetUser("Siema");
