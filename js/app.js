//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI() { }

UI.prototype.addBookToList = function (book) {
    const list = document.querySelector(".list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

    list.appendChild(row);
}

UI.prototype.showAlert = function (message, className) {
    const heading = document.querySelector(".heading");
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    heading.after(div);

    setTimeout(function () {
        document.querySelector(".alert").remove();
    }, 3000);
}

UI.prototype.clearInputs = function () {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
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

        //Succes alert
        ui.showAlert("Book added!", "alert-success");

        //Clear inputs
        ui.clearInputs();
    }




});


