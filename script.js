const popUp = document.querySelector(".pop-up");
const submit = document.querySelector("#submit");
const form = document.querySelector("form");
const add = document.querySelector(".add");
const cancelForm = document.querySelector(".cancel-form");

add.addEventListener("click", () => {
    displayForm();
})

cancelForm.addEventListener("click",() => {
    popUp.close();
})

function displayForm() {
    form.reset();
    popUp.showModal();   
}

submit.addEventListener("click", (event) => {
        event.preventDefault();

        const formTitle = document.querySelector("#title").value;
        const formAuthor = document.querySelector("#author").value;
        const formpage = document.querySelector("#pages").value;
        const formRead = document.querySelector("#read").checked;

        const book = new Book(formTitle, formAuthor, formpage, formRead);

        addBookToLibrary(book);
        popUp.close();
        displayBooks();
    });

function displayBooks() {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    myLibrary.forEach ((book,index) => {
        const card = document.createElement("div");
        
        card.classList.add("card");
        const title = document.createElement("p");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const readBtn = document.createElement("button");
        const removeBtn = document.createElement("button");

        title.innerHTML = `<b>Title:</b> ${book.title}`;
        author.innerHTML = `<b>Author: </b>${book.author}`;
        pages.innerHTML = `<b>Pages: </b> ${book.pages}`;
        readBtn.innerHTML = book.read ? "READ" : "NOT READ";
        removeBtn.innerHTML = "REMOVE";


        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readBtn);
        card.appendChild(removeBtn);

        container.appendChild(card);
        readBtn.addEventListener("click",() => {
            book.toggleReadStatus();
            displayBooks();
        })
        removeBtn.addEventListener("click", () => {
            removeBookFromLibrary(index);
            displayBooks();
        })
    })  
}

function Book(title, author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
}

const myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    if (index >= 0 && index < myLibrary.length) {
        myLibrary.splice(index, 1);
    }
}





