const newBtn = document.querySelector("#new");
const form = document.querySelector("form");
const tbody = document.querySelector("tbody");

newBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
});


//Library logic
 const myLibrary = [];

 function Book(title, author, pages, status) {
   this.id = crypto.randomUUID();
   this.title = title;
   this.author= author;
   this.pages = pages;
   this.status = status;
  }

 function addBookToLibrary(book) {
  myLibrary.push(book);

  displayLibrary();
 }

 document.querySelector('form').addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  let book = new Book(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("status")
  );
  addBookToLibrary(book);
  console.log(myLibrary);
  e.target.reset();
  form.classList.add("hidden");
 });

 function displayLibrary() {
   tbody.innerHTML = "";
   for (const book of myLibrary) {
     const tr = document.createElement("tr");
     const properties = ["title", "author", "pages", "status"];
     properties.forEach(prop => {
       let td = document.createElement("td");
       td.textContent = book[prop];
       tr.appendChild(td);
     });
     const dltTd = document.createElement("td");
     const dlt = document.createElement("button");
     dlt.textContent = "Delete";

     dlt.addEventListener("click", () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      myLibrary.splice(index, 1);
      displayLibrary();
     });
     dltTd.appendChild(dlt);
     tr.appendChild(dltTd);
     tbody.appendChild(tr);
    }
  }

  function deleteBook() {
    for (const book of myLibrary) {

      const index = myLibrary.findIndex(b => b.id === book.id);
      myLibrary.splice(index, 1);
      displayLibrary();
    }
  }


