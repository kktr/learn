// Create a function that renders the three team images
// Use a for loop, template strings (``), plus equals (+=)
// .innerHTML to solve the challenge.

const imgs = [
    "images/hip1.jpg",
    "images/hip2.jpg",
    "images/hip3.jpg"
]
let imgCointainer = document.getElementById("container")

function renders(imgData) {
  let images = ""
  for (var i = 0; i < imgData.length; i++) {
    images += `<img class="team-img" src="${imgData[i]}">`
  }
  imgCointainer.innerHTML = images;
}
renders(imgs);



// <img class="team-img" src="images/hip1.jpg">
// <img class="team-img" src="images/hip2.jpg">
// <img class="team-img" src="images/hip3.jpg">
