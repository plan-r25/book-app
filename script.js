const newBtn = document.querySelector(".new");
const dialog = document.querySelector("#formDialog");
const closeBtn = document.querySelector(".close")
const container = document.querySelector(".bookContainer");   const addBtn = document.querySelector(".add");
const form = document.querySelector("form");

let libr = [];
let editingId = null;


//dialog box listener
newBtn.addEventListener("click", () => {
  form.reset();
  addBtn.textContent = "Add";
  dialog.showModal();
})

closeBtn.addEventListener("click", () => {
  editingId = null;
  dialog.close();
})



//library logic
class Book {
  constructor(title, description, author, pages, category, status = "unread") {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.author = author;
    this.pages = pages;
    this.category = category;
    this.status = status;
  }
}

const defaultBooks = [
  new Book("Eternally Regressing Knight",
           "Aslo known as The Knight Only Lives Today, is a fantasy action novel about a medicore knight who gains the ability to return to the past whenever he dies.Unlike many protagonist, he starts with little talent and must repeatedly learn from his mistakes.",
           "Soul Pung",
           "600",
           "Fantasy, Action, Adventure"
  ),
  new Book("Myst, Might, Mayhem",
           "It follows Mok Gyeongwoon, a ruthless killer who takes the identity of a noble family's third young master and rises through a brutal martial world filled with demons, ghosts, conspiracies, and overwhelming power. It is known for its morally dark MC, and the connection to the universe of Nano Machine.",
           "Han joong Wol Ya",
           "400",
           "Martial Arts, Dark Fantasy, Action"
  ),
  new Book("Mastery",
           "It explores the lives of historical figures, artists, scientists, and entreprenuers, the book outline a path to mastery through apprenticeship, continous learning and delibrate practice.",
           "Robert Greene",
            352,
            "Psychology, Leadership, Self-help"
  ),
  new Book("How to Win Friends and Influence People",
           "A classic self-help book that teaches techniques for improving communication, building strong relationship, and positively influencing others. Through simple principles and real-life examples.",
           "Dale Carnegie",
            288,
            "Communication Skills, Self-help"
  ),
    new Book("Atomic Habits", 
           "It's a self-improvement book that explain how small, consistent changes in daily behaviour can lead to remarkable result over time.", 
           "James Clear", 
            320, 
           "Self-help"
  ),
];
if(!localStorage.getItem("library")) {
  localStorage.setItem("library", JSON.stringify(defaultBooks));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  //editing an existing book
  if (editingId !== null) {
    const book = libr.find(b => b.id === editingId);
    if (book) {
     book.title = formData.get("title");
     book.description = formData.get("description");
     book.author = formData.get("author");
     book.pages = Number(formData.get("pages"));
     book.category = formData.get("category");
    }
    editingId = null;
  } else {
    //adding a new book
    let book = new Book(
      formData.get("title"),
      formData.get("description"),
      formData.get("author"),
      Number(formData.get("pages")),
      formData.get("category")  
    );
  libr.push(book);
  }
  localStorage.setItem("library", JSON.stringify(libr));
  showBook();
  e.target.reset();
  dialog.close();
});


//get the book from library and display it in a card
function showBook() {
  container.innerHTML = '';
  libr = JSON.parse(localStorage.getItem("library")) || [];
  const fragment = document.createDocumentFragment();

  for (const book of libr) {
    const card = document.createElement("div");
    card.classList.add("card");

    const properties = ["title", "description", "author", "pages", "category"];
    properties.forEach(prop => {
      const text = document.createElement("p");
      text.textContent = book[prop];
      text.classList.add(`book-${prop}`);
      card.appendChild(text);
    })

    const div = document.createElement("div");
    div.classList.add("button-cont")

    //delete button
    const dltBtn = document.createElement("button");
    dltBtn.textContent = "Delete";
    dltBtn.classList.add("delete")
    dltBtn.addEventListener("click", () => {
      const index = libr.findIndex(b => b.id === book.id);
      libr.splice(index, 1);
      localStorage.setItem("library", JSON.stringify(libr));
      showBook();
    });
    
    //edit button
    const edtBtn = document.createElement('button');
    edtBtn.textContent = "Edit";
    edtBtn.classList.add("edit");
    edtBtn.addEventListener("click", () => {
      addBtn.textContent = "Save";
      editBook(book);
    });


    //status read/unread button
    const stats = document.createElement("button");
    stats.classList.add("stats");
    stats.textContent = book.status || "unread";
    stats.addEventListener("click", () => {
      book.status = book.status === "read" ? "unread" : "read";
      stats.textContent = book.status;
      localStorage.setItem("library", JSON.stringify(libr));
    });

    //appending all the elements
    div.append(dltBtn, edtBtn, stats);
    card.appendChild(div);
    fragment.appendChild(card);
  }
  container.appendChild(fragment);
}


//function to edit existing book
function editBook(book) {
  editingId = book.id;

  const title = document.querySelector("input[name='title']");
  const description = document.querySelector("textarea[name='description']");
  const author = document.querySelector("input[name='author']");
  const pages = document.querySelector("input[name='pages']");
  const category = document.querySelector("input[name='category']");
  
  title.value = book.title;
  description.value = book.description;
  author.value = book.author;
  pages.value = book.pages;
  category.value = book.category;
  
  dialog.showModal();
}

showBook();