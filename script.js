const myLibrary = [];

const querySelector = {
    newBookButton : document.querySelector('.newBookButton'),
    addBookButton : document.querySelector('.addBookButton'),
    dialog : document.querySelector('dialog'),
    form : new FormData(document.querySelector('form')),
    updateFormReference : function() {
        this.form = new FormData(document.querySelector('form'))
    },
    inputs : document.querySelectorAll('form input')
}

function Book(title, author, genre, numberOfPages, hasRead) {
    this['Title'] = title
    this['Author'] = author
    this['Genre'] = genre
    this['Number of Pages'] = numberOfPages

    Object.defineProperty(this, 'toggleHasRead', {
        value: function() {
            this.hasRead = !(this.hasRead)
        },
        enumerable: false
    })

    Object.defineProperty(this, 'hasRead', {
        value: hasRead,
        enumerable: false,
        writable: true
    })
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
        const readIndicator = document.createElement('div')
        readIndicator.classList = 'read-indicator'
        if (book.hasRead) {readIndicator.toggleAttribute('read')}
        readIndicator.addEventListener('click', () => {
            readIndicator.toggleAttribute('read')
            book.toggleHasRead()
        })

        const deleteButton = document.createElement('button')
        deleteButton.classList = 'delete-button'
        deleteButton.textContent = '✖'
        deleteButton.addEventListener('click', () => {
            myLibrary.splice(index, 1)
            body.removeChild(container)
            refreshLibrary()
        })

        card.appendChild(readIndicator)
        card.appendChild(deleteButton)
        container.appendChild(card)
    })
    body.prepend(container)
}

querySelector.newBookButton.addEventListener('click', () => {
    querySelector.dialog.show()
})

querySelector.addBookButton.addEventListener('click', (event) => {
    event.preventDefault()
    querySelector.updateFormReference()
    const body = document.querySelector('body')

    addBookToLibrary(new Book(querySelector.form.get('title'),
                            querySelector.form.get('author'),
                            querySelector.form.get('genre'),
                            querySelector.form.get('numberOfPages')))
    body.removeChild(body.firstChild)
    refreshLibrary()
    querySelector.dialog.close()
    querySelector.inputs.forEach((input) => {
        input.value = ''
    })
})

addBookToLibrary(new Book('Galazilla', 'Glinda Spear', 'Space Opera', 1004, true))
addBookToLibrary(new Book('House', 'Mr. Someone', 'Fantasy', 453, true))

refreshLibrary()