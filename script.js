const myLibrary = [];

function Book(title, author, genre, numberOfPages) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.numberOfPages = numberOfPages;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

