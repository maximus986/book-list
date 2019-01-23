(function IIFE() {
    //Book constructor
    function Book(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    //UI constructor
    function UI() { }

    let books;

    document.addEventListener("DOMContentLoaded", function () {
        const ui = new UI();
        ui.getBooksFromLocalStorage();
    });

    UI.prototype.addBookToList = (book) => {
        const list = document.querySelector(".list");
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><span class="delete fa fa-times"></span></td>
        `;
        list.appendChild(row);
    }

    UI.prototype.showAlert = (message, className) => {
        const heading = document.querySelector(".heading");
        const div = document.createElement("div");
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        heading.after(div);

        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 3000);
    }

    UI.prototype.clearInputs = () => {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }

    UI.prototype.deleteBookFromList = (target) => {
        if (target.className = "delete") {
            target.parentElement.parentElement.remove();
        }
    }

    UI.prototype.setBooksInLocalStorage = (book) => {
        checkStorage();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    UI.prototype.getBooksFromLocalStorage = () => {
        checkStorage();
        books.map(book => {
            const list = document.querySelector(".list");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><span class="delete fa fa-times"></span></td>
            `;
            list.appendChild(row);
        });
    }

    UI.prototype.deleteBooksFromLocalStorage = (target) => {
        checkStorage();
        books.forEach((book, index) => {
            if (book.title === target.parentElement.parentElement.children[index].textContent) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }

    // Event listener
    document.querySelector("#book-form").addEventListener("submit", function (e) {
        e.preventDefault();
        //Get form elements values
        const title = document.querySelector("#title").value,
            author = document.querySelector("#author").value,
            isbn = document.querySelector("#isbn").value;

        //Instantiate book
        const book = new Book(title, author, isbn);

        //Instantiate UI
        const ui = new UI();

        //Validation
        if (title === "" || author === "" || isbn === "") {
            //Error alert
            ui.showAlert("Please fill in the all fields!", "alert-danger");
        } else {
            //Add book to list
            ui.addBookToList(book);

            //Success alert
            ui.showAlert("Book added!", "alert-success");

            //Clear inputs
            ui.clearInputs();

            //Set books to local storage
            ui.setBooksInLocalStorage(book);
        }
    });

    document.querySelector(".list").addEventListener("click", function (e) {
        e.preventDefault();
        const ui = new UI();
        ui.deleteBookFromList(e.target);
        ui.showAlert("Book removed!", "alert-success");

        //Delete books from local storage
        ui.deleteBooksFromLocalStorage(e.target);
    });

    function checkStorage() {
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
    }
})();
