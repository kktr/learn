/*jshint esversion: 6*/
/* eslint-env es6 */

/*
    1.

    Load users from users.json (originally from https://jsonplaceholder.typicode.com/users)

    Create a simple component that displays the user's username
        -Alongside a green circle
        -The username and circle should be in individual divs
        -Both should be vertically and horizontally centered
        -The component should only be wide enough to Fit its Content (and some padding)
*/
const socialAsideEl = document.getElementById('social-aside');

let usersNamesHTML = '';
let circleHTML = `<div class="circle"></div>`;
let cointainerEl = document.createElement('div');
cointainerEl.classList.add('cointainer');
socialAsideEl.append(cointainerEl);

async function getUsers() {
  let response = await fetch('users.json');
  let users = await response.json();
  return users;
}

getUsers().then(users => {
  users.forEach(
    user =>
      (usersNamesHTML += `<div class="user">${circleHTML} <p>${user.name}</p></div>`)
  );
  cointainerEl.innerHTML = usersNamesHTML;
});
