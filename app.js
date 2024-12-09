const myLibrary = []; // book storage
const bookContainer = document.querySelector(".libraryGrid");

const popupWrapper = document.querySelector(".wrapper");
const addPopup = document.getElementById("addPopup");
const addBtn = document.getElementById("addBtn");

const submitBtnPopup = document.getElementById("submitBtnPopup");
const cancelBtnPopup = document.getElementById("cancelBtnPopup");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readBool = document.getElementById("read");
const deleteCardBtn = document.getElementById("deleteCardBtn");

// constructor
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = Boolean(readStatus);
}

// dialog / modal open
addBtn.addEventListener("click", () => {
    addPopup.showModal();
})
// dialog / modal close
function closePopup() {
    addPopup.close();
}

// remove window from view if clicked outside of the modal 
addPopup.addEventListener("click", (e) => {
    if(!popupWrapper.contains(e.target)) {
        addPopup.close();
    }
})

function addBookToLibrary(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    displayBook();
}

function displayBook() {
    bookContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        bookCard.innerHTML =
         `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.readStatus ? "Yes" : "No"}</p>
            <button id="deleteCardBtn" onclick="deleteCard(${index})">Delete</button>
        `;
        bookContainer.appendChild(bookCard);
    });
}

// DELETE card function
function deleteCard(index) {
 myLibrary.splice(index, 1);
 displayBook();
}

// CANCEL Popup btn
cancelBtnPopup.addEventListener("click", closePopup);
// SUBMIT Btn popup
submitBtnPopup.addEventListener("click", () => {
 // manual validation for empty inputs
  if (!titleInput.value.trim()) {
    alert('Please enter a title.');
    return;
  }
  if (!authorInput.value.trim()) {
    alert('Please enter an author.');
    return;
  }
  if (!pagesInput.value.trim() || isNaN(pagesInput.value) || pagesInput.value < 1) {
    alert('Please enter a valid number of pages.');
    return;
  }
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = parseInt(pagesInput.value, 10);
    const readStatus = readBool.checked;

    addBookToLibrary(title, author, pages, readStatus);

    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readBool.checked = false;
    closePopup();
});