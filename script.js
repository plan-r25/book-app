const newBtn = document.querySelector(".new");
const dialog = document.querySelector("#formDialog");
const closeBtn = document.querySelector(".close-icon")
const container = document.querySelector(".bookContainer")

//dialog box listener
newBtn.addEventListener("click", () => {
  dialog.showModal();
})

closeBtn.addEventListener("click", () => {
  dialog.close();
})

//library logic
class Book {
  constructor(title, description, author, pages, category) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.author = author;
    this.pages = pages;
    this.category = category;
  }
}

const myLibrary = [
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
    new Book("The Atomic Habits", 
           "It's a self-improvement book that explain how small, consistent changes in daily behaviour can lead to remarkable result over time.", 
           "James Clear", 
            320, 
           "Self-help"
  ),
];

// function addBookToLibrary(book) {
//   myLibrary.push(book);
//   showBook();
//   console.log(myLibrary);
// }

document.querySelector('form').addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  if (editingId !== null) {
    const book = myLibrary.find(b => b.id === editingId);
    book.title = formData.get("title");
    book.description = formData.get("description");
    book.author = formData.get("author");
    book.pages = Number(formData.get("pages"));
    book.category = formData.get("category");
    editingId = null;
  } else {
    let book = new Book(
      formData.get("title"),
      formData.get("description"),
      formData.get("author"),
      Number(formData.get("pages")),
      formData.get("category")  
    );
  myLibrary.push(book);
  }
  showBook();
  e.target.reset();
  dialog.close();
});


//get the book from library and display it in a card
function showBook() {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (const book of myLibrary) {
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

    const dltBtn = document.createElement("button");
    dltBtn.textContent = "Delete";
    dltBtn.classList.add("delete")
    dltBtn.addEventListener("click", (e) => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      myLibrary.splice(index, 1);
      showBook();
    });
    
    const edtBtn = document.createElement('button');
    edtBtn.textContent = "Edit";
    edtBtn.classList.add("edit");
    edtBtn.addEventListener("click", () => {
      const edit = myLibrary.find(b => b.id === book.id);
      editBook(edit);
    });
    
    div.append(dltBtn, edtBtn);
    card.appendChild(div);
    fragment.appendChild(card);
  }
  container.appendChild(fragment);
}

showBook();

let editingId = null;
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
