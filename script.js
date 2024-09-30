const myLibrary = [];

const querySelector = {
  newBookButton: document.querySelector(".newBookButton"),
  addBookButton: document.querySelector(".addBookButton"),
  dialog: document.querySelector("dialog"),
  dialogBackdrop: document.querySelector(".dialog-backdrop"),
  activateDialogBackdrop: function () {
    this.dialogBackdrop.setAttribute("style", "pointer-events: initial;");
  },
  deactivateDialogBackdrop: function () {
    this.dialogBackdrop.setAttribute("style", "pointer-events: none;");
  },
  form: new FormData(document.querySelector("form")),
  updateFormReference: function () {
    this.form = new FormData(document.querySelector("form"));
  },
  inputs: document.querySelectorAll("form input"),
  hasReadCheckbox: document.getElementById("has-read"),
};

class Book {
  #hasRead;
  constructor(title, author, genre, numberOfPages, hasRead) {
    this["Title"] = title;
    this["Author"] = author;
    this["Genre"] = genre;
    this["Number of Pages"] = numberOfPages;
    this.#hasRead = hasRead;
  }

  get hasRead() {
    return this.#hasRead;
  }

  toggleHasRead() {
    this.#hasRead = !this.#hasRead;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function refreshLibrary() {
  const body = document.querySelector("body");
  const container = document.createElement("div");
  container.classList = "container";

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList = "card";
    const delayTime = 50 * index;
    card.setAttribute("style", `animation-delay: ${delayTime}ms;`);
    for (let property in book) {
      const p = document.createElement("p");
      const key = document.createElement("span");
      const value = document.createElement("em");

      key.classList = "key";
      key.textContent = property + ":";

      value.classList = "value";
      value.textContent = book[property];

      p.appendChild(key);
      p.appendChild(value);
      card.appendChild(p);
    }
    const readIndicator = document.createElement("div");
    readIndicator.classList = "read-indicator";
    if (book.hasRead) {
      readIndicator.toggleAttribute("read");
    }
    readIndicator.addEventListener("click", () => {
      readIndicator.toggleAttribute("read");
      book.toggleHasRead();
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList = "delete-button";
    deleteButton.textContent = "✖";
    deleteButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      body.removeChild(container);
      refreshLibrary();
    });

    card.appendChild(readIndicator);
    card.appendChild(deleteButton);
    container.appendChild(card);
  });
  body.prepend(container);
}

querySelector.newBookButton.addEventListener("click", () => {
  querySelector.dialog.show();
  querySelector.activateDialogBackdrop();
});

querySelector.dialog.addEventListener("click", (ev) => {
  ev.stopPropagation();
});

querySelector.dialogBackdrop.addEventListener("click", () => {
  querySelector.dialog.close();
  querySelector.deactivateDialogBackdrop();
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (document.querySelector("form").checkValidity()) {
    querySelector.updateFormReference();
    const form = {
      title: querySelector.form.get("title"),
      author: querySelector.form.get("author"),
      genre: querySelector.form.get("genre"),
      numberOfPages: querySelector.form.get("numberOfPages"),
    };
    const body = document.querySelector("body");
    const hasRead = querySelector.hasReadCheckbox.checked;
    addBookToLibrary(
      new Book(form.title, form.author, form.genre, form.numberOfPages, hasRead)
    );
    body.removeChild(body.firstChild);
    refreshLibrary();
    querySelector.dialog.close();
    querySelector.deactivateDialogBackdrop();
    querySelector.inputs.forEach((input) => {
      input.value = "";
    });
  } else {
    for (const input of [...querySelector.inputs].reverse()) {
      if (!input.validity.valid) {
        if (input.validity.valueMissing) {
          input.setCustomValidity("You need to put something here");
        } else if (input.validity.tooShort) {
          input.setCustomValidity("Input should be longer than 2 characters");
        } else if (input.validity.tooLong) {
          input.setCustomValidity("Okey that's enough");
        } else if (input.validity.rangeOverflow) {
          input.setCustomValidity("Too many pages");
        }
        input.reportValidity();
      } else {
        input.setCustomValidity("");
        input.reportValidity();
      }
    }
  }
});

addBookToLibrary(new Book("Dune", "Frank Herbert", "Space Opera", 632, true));
addBookToLibrary(
  new Book("Old Man's War", "John Scalzi", "Space Opera", 320, false)
);
addBookToLibrary(new Book("1984", "George Orwell", "Dystopian", 328, true));
addBookToLibrary(
  new Book("The Hitchhiker", "Douglas Adams", "Science Fiction", 320, false)
);
addBookToLibrary(
  new Book("The Handmaid", "Margaret Atwood", "Dystopian", 311, true)
);

refreshLibrary();
