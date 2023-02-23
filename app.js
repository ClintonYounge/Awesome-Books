let booksArray = [];
const localDataStorage = JSON.parse(localStorage.getItem('booksArray'));
const BookListContainer = document.querySelector('.book-section');

if (localDataStorage != null) {
  localDataStorage.forEach((bookItem) => {
    BookListContainer.innerHTML += `
  <div>
  <div><strong>${bookItem.name}</div>
  <div>${bookItem.author}</strong></div>
  <button class='remove-btn' id='${bookItem.id}' 
    onclick='deleteBook(${bookItem.id})'>Remove</button>
  </div>
  <hr>
  `;
    const book = {
      id: bookItem.id,
      name: bookItem.name,
      author: bookItem.author,
    };
    booksArray.push(book);
  });
}

const btnSubmit = document.querySelector('#add-btn');
const BookName = document.querySelector('#title');
const BookAuthor = document.querySelector('#author');

// ADD Book Funciton
function addBook() {
  const book = {
    id: booksArray.length,
    name: BookName.value,
    author: BookAuthor.value,
  };
  booksArray.push(book);
  localStorage.setItem('booksArray', JSON.stringify(booksArray));
}

btnSubmit.addEventListener('click', addBook);
const remove = document.querySelector('.remove-btn');

remove.addEventListener('click', deleteBook)


function deleteBook(id) {
  booksArray = booksArray.filter((bookItem) => bookItem.id !== id);
  localStorage.setItem('booksArray', JSON.stringify(booksArray));
  location.reload();
}