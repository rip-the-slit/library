const myLibrary = [];
const container = document.querySelector('.container')

function Book(title, author, genre, numberOfPages) {
    this['Title'] = title;
    this['Author'] = author;
    this['Genre'] = genre;
    this['Number of Pages'] = numberOfPages;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function refreshLibrary() {
    myLibrary.forEach((book, index) => {
        const card = document.createElement('div')
        card.classList = "card"
        for (let property in book) {
            const p = document.createElement('p')
            const key = document.createElement('span')
            const value = document.createElement('em')

            key.classList = 'key'
            key.textContent = property + ':'

            value.classList = 'value'
            value.textContent = book[property]

            p.appendChild(key)
            p.appendChild(value)
            card.appendChild(p)
        }
        container.appendChild(card)
    })
}