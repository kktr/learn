/*jshint esversion: 6*/
/* eslint-env es6 */
const posts = document.getElementById('blog-posts');
const newPost = document.getElementById('send-post');
const inputPostBody = document.getElementById('post-body');
const inputPostTitle = document.getElementById('post-title');
let fiveFirstPosts = '';

function getPosts() {
  fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(response => response.json())
    .then(data => saveData(data));
}

getPosts();

function saveData(data) {
  fiveFirstPosts = data.slice(0, 5);
  console.log(fiveFirstPosts[0].body);
  displayPosts();
}

function displayPosts() {
  fiveFirstPosts.forEach((poster, i) => {
    posts.innerHTML += `
    <div class="post post-${i + 1}">
      <h3 class= "post-title post-${i + 1}-title">
        ${poster.title}
      </h3>

      <p class="post-body">${poster.body}</p>
    </div>`;
  });
}

newPost.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(inputPostBody.value);
});
