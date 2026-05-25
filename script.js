const newBtn = document.querySelector("#new");
const form = document.querySelector(".form");

newBtn.addEventListener("click", () => {
  form.classList.toggle("form");
});


//Library logic
 const myLibrary = [];

 function Book(title, author, page, status) {
   this.title = title;
   this.author= author;
   this.page = page;
   this.status = status;
  }

  // Book.prototype.info = function() {
  //    return `${this.title} by ${this.author}, ${this.page} ${this.status}`;
  // };

 function addBookToLibrary(hello, author, page, status) {
  let book = new Book(hello, author, page, status);
  myLibrary.push(book);
 }

 addBookToLibrary("one piece", "Oda", 400, "read");
 console.log(myLibrary);



