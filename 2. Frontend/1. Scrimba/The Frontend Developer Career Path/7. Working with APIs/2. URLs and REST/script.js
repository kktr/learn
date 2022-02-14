/*jshint esversion: 6*/
/* eslint-env es6 */
const posts = document.getElementById('blog-posts');
const sendNewPost = document.getElementById('send-new-post');
const inputPostBody = document.getElementById('new-post-body');
const inputPostTitle = document.getElementById('new-post-title');
let displayedPosts = {};

function getPosts() {
  fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(response => response.json())
    .then(data => {
      savePosts(data);
      displayPosts();
    });
}

getPosts();

function savePosts(data) {
  displayedPosts = data.slice(0, 5);
}

function displayPosts() {
  posts.innerHTML = '';
  displayedPosts.forEach((poster, i) => {
    posts.innerHTML += `
    <div class="post post-${i + 1}">
      <h3 class= "new-post-title post-${i + 1}-title">
        ${poster.title}
      </h3>

      <p class="new-post-body">${poster.body}</p>
    </div>`;
  });
}

sendNewPost.addEventListener('submit', function(e) {
  e.preventDefault();
  const postBody = inputPostBody.value;
  const postTitle = inputPostTitle.value;
  this.reset();
  const newPost = {
    title: postTitle,
    body: postBody
  };
  displayedPosts.unshift(newPost);
  displayPosts();

  fetch('https://apis.scrimba.com/jsonplaceholder/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then(response => response.json())
    .then(data => console.log(data));
});

fetch(
  'https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=51.94&lon=15.5&units=metric',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
  .then(response => response.json())
  .then(data => console.log(data));
