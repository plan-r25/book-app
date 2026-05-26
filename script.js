const newBtn = document.querySelector("#new");
const form = document.querySelector("form");

newBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
});


//Library logic
 const myLibrary = [];

 function Book(title, author, page, status) {
   this.id = crypto.randomUUID();
   this.title = title;
   this.author= author;
   this.page = page;
   this.status = status;
  }

 function addBookToLibrary(book) {
  myLibrary.push(book);
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
 });

 function displayLibrary() {
   for (const book of myLibrary) {
     let tr = document.createElement("tr");

     for (const [key, value] of Object.entries(book)) {
      let td = document.createElement("td");
      td.textContent = `${value}`;
      tr.appendChild(td);
      console.log(td.textContent);
     }
   }
  }




