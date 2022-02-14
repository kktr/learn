/*jshint esversion: 6*/
/* eslint-env es6 */

/*
    Challenge

    Copy the JSON user from the API call
        Store it in the user.json file
        Replace the API call with a call to this new file

    Create a profile of your favorite fictional character
        Style it to fit the character or you own personality!
*/

async function getUser() {
  let response = await fetch('user.json');
  let user = await response.json();
  return user;
}

function displayUser(user) {
  document.body.innerHTML = `<div class="user-profile">
        <div class="user-profile-header">
            <div>${user.name}</div>
            <div>@${user.username}</div>
        </div>

        <div class="user-profile-company">
            <div>Company: ${user.company.name}</div>
            <div>${user.company.catchPhrase}</div>
            <div>${user.company.bs}</div>
        </div>

        <div class="user-profile-contact">
            <div>📧${user.email}</div>
            <div>📞${user.phone}</div>
            <div>💻${user.website}</div>
        </div>

        <div class="user-profile-address">
            <div>${user.address.street}, ${user.address.suite}</div>
            <div>${user.address.city} ${user.address.zipcode}</div>
        </div>
    </div>`;
}

getUser().then(displayUser);
