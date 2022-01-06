/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

/* 
    Library
    
    Fetch the collection of books 
        from books.json, assign each 
        a unique id
        
    Create a div to represent a book
        using Grid & grid-template-areas 
        build a book component
        display all books using Flexbox
*/

async function getBooks() {
  const response = await fetch('books.json');
  const books = await response.json();
  console.log(books);
  let n = 1;
  return books.map((book) => {
    book.id = n;
    n++;
    return book;
  });
}

function getBookHtml(book) {
  return `
  <div class="my-book">
    <div class="my-book-cover"><h2>${book.title}</h2></div>
    <div class="my-book-spine"></div>
    <div class="my-book-footer"></div>
  </div>
`;
}

// function displayBooks(data) {}

getBooks().then(
  (books) =>
    (document.body.innerHTML = `
  <div class="my-library">
    ${books.map(getBookHtml).join('')}
  </div>
  `)
);
