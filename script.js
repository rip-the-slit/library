const myLibrary = [];

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
    const body = document.querySelector('body')
    const container = document.createElement('div')
    container.classList = 'container'

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div')
        card.classList = "card"
        card.setAttribute('data-attribute', index)
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

        const deleteButton = document.createElement('button')
        deleteButton.classList = 'delete-button'
        deleteButton.textContent = '✖'
        deleteButton.addEventListener('click', () => {
            myLibrary.splice(index, 1)
            body.removeChild(container)
            refreshLibrary()
        })

        card.appendChild(deleteButton)
        container.appendChild(card)
    })
    body.appendChild(container)
}

addBookToLibrary(new Book('Galazilla', 'Glinda Spear', 'Space Opera', 1004))
addBookToLibrary(new Book('House', 'Mr. Someone', 'Fantasy', 453))

refreshLibrary()