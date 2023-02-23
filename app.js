class BookList {
  constructor() {
    this.books = this.getBooks();
    this.table = document.querySelector('#book-list tbody');
    this.form = document.querySelector('form');
    this.titleInput = document.querySelector('#title');
    this.authorInput = document.querySelector('#author');

    // Bind event listeners
    this.form.addEventListener('submit', this.addBook.bind(this));
    this.table.addEventListener('click', this.removeBook.bind(this));

    // Display books
    this.displayBooks();
  }

  // Get books from local storage
  getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
  }

  // Save books to local storage
  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  // Display all books in the list
  displayBooks() {
    this.table.innerHTML = '';
    this.books.forEach(book => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><button class="delete">Remove</button></td>
      `;
      this.table.appendChild(row);
    });
  }

  // Add a new book to the list
  addBook(e) {
    e.preventDefault();
    const title = this.titleInput.value.trim();
    const author = this.authorInput.value.trim();
    if (!title || !author) {
      alert('Please fill in all fields');
      return;
    }
    const book = { title, author };
    this.books.push(book);
    this.saveBooks();
    this.displayBooks();
    this.titleInput.value = '';
    this.authorInput.value = '';
  }

  // Remove a book from the list
  removeBook(e) {
    if (!e.target.classList.contains('delete')) {
      return;
    }
    const row = e.target.closest('tr');
    const index = Array.from(this.table.children).indexOf(row);
    this.books.splice(index, 1);
    this.saveBooks();
    this.displayBooks();
  }
}

new BookList();