
const container = document.getElementById("container")
function cont() {
  container.innerHTML += '<p>"Thank you for buying"</p>'
}

container.innerHTML = '<button onclick="cont()">Buy!</button>'

// When clicked, render a paragraph under the button (in the container)
// that says "Thank you for buying!"
