/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

/* 
    Bonus Challenge 

    Fetch the list of 642 open APIs from
        https://api.publicapis.org/entries
        
    Create a my-api component
        display the name and category of the API,
        the description, and also display the type 
        of Auth (if any) and whether or not the API 
        supports HTTPS
    
    Use CSS Grid to style my-api
        The title and category should be 
        listed as Title (Category) 
        and should link to the API docs
        
    The grid should have 4 rows
        3rem, 1rem, 4rem, 3rem respectively
        and 3 columns each 1/3rd of available width
        
    Finally, display all of the APIs
*/

const apisEl = document.getElementById('apis-container');

async function getAPIs() {
  const response = await fetch('https://api.publicapis.org/entries');
  const myAPIs = response.json();
  console.log(myAPIs);
  return myAPIs;
}

function getAPIhtml(myAPI) {
  const myApiAuth = myAPI.Auth
    ? `<div class="api-auth auth-true">Auth: ${myAPI.Auth}</div>`
    : `<div class="api-auth auth-none">Auth: None</div>`;
  const myApiHttps = myAPI.HTTPS
    ? `<div class="api-https https-true">HTTPS: true</div>`
    : `<div class="api-https https-false">HTTPS: false</div>`;

  const apiHtml = `<div class="my-api">
    <div class="api-title">
      <a class="link" href="${myAPI.Link}" target="_blank">${myAPI.API} (${myAPI.Category})</a>
    </div>
    <p class="api-body">${myAPI.Description}</p>

    <div class="api-footer">
      ${myApiAuth}

      ${myApiHttps}
    </div>
  </div>
  
  `;
  return apiHtml;
}

function displayAPIs(myAPIs) {
  myAPIs = myAPIs.entries;
  apisEl.innerHTML = myAPIs.map(getAPIhtml).join('');
}

getAPIs()
  .then(displayAPIs)
  .catch((e) => console.log(`Error: ${e}`));
