// Grab the welcome-el paragraph and store it in a variable called welcomeEl
let welcomeEl = document.getElementById('welcome-el');
// Create two variables (name & greeting) that contains your name
let name = "Krystian";
// and the greeting we want to render on the page
let gretting = "Hi, my name is ";
// Render the welcome message using welcomeEl.innerText
welcomeEl.innerText = gretting + name;
