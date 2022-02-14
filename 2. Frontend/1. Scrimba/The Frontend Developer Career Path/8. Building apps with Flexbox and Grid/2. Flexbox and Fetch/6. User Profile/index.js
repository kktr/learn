/*jshint esversion: 6*/
/* eslint-env es6 */

/*
    Create a User Profile using data from
        https://jsonplaceholder.typicode.com/users/3

    The User Profile must be a Flexbox container with 4 components
        1. Profile Header
            - With the User's name and username
        2. Company
            - Displaying information about their company
        3. Contact Details
            - Contains Email/Phone/Website
        4. User Address
*/
let userProfilEl = document.createElement('div');
userProfilEl.classList.add('user-profile');
document.body.append(userProfilEl);

async function getUser() {
  let response = await fetch('https://jsonplaceholder.typicode.com/users/3');
  let data = await response.json();
  console.log(data);
  return data;
}

function displayUser() {
  getUser().then(data => {
    userProfilEl.innerHTML = `
  <div class="profile-header">
    <h2 class="username">@${data.username}</h2>
    <h3 class="name">${data.name}</h3>
  </div>

  <div class="profile-company-info">
    <h2>Company</h2>
     <p>Name: ${data.company.name}</p>
     <p>Info: ${data.company.catchPhrase}</p>
     <p>Bs: ${data.company.bs}</p>
  </div>

  <div class="profile-conatct-info">
    <h3>Contact</h3>
    <p>Email: ${data.email}</p>
    <p>Phone: ${data.phone}</p>
    <p>Website: ${data.website}</p>
  </div>

  <div class="profile-adress-info">
    <h3>Adress</h3>
    <p>City: ${data.address.city}</p>
  </div>
  `;
  });
}

displayUser();
