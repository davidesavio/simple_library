let myLibrary = [
    {
        author : 'Georges Simenon',
        title : 'Il signor Cardinaud',
        publisher : 'Adelphi',
        year : '1941',
        pages : '136',
        readed : false
    }
];
let btnNewBook = document.getElementById('btnNewBook')
let btnAdd = document.getElementById('btnAdd')
let btnCancel = document.getElementById('btnCancel')
let form = document.getElementById('form-container')
let booksContainer = document.querySelector('main')
let formIsVisible = false
let bookToUpdateIndex = false
let title = document.getElementById('title')
let author = document.getElementById('author')
let publisher = document.getElementById('publisher')
let year = document.getElementById('year')
let pages = document.getElementById('pages')
let readed = document.getElementById('readed')
btnNewBook.addEventListener('click', toggleForm)
btnAdd.addEventListener('click', addBookToLibrary)
btnCancel.addEventListener('click', toggleForm)



function Book(title, author, publisher, year, pages, readed) {
  this.title = title;
  this.author = author;
  this.publisher = publisher;
  this.year = year;
  this.pages = pages;
  this.readed = readed;
}

function addBookToLibrary(e) {
    
    let newBook = new Book(
        title.value,
        author.value,
        publisher.value,
        year.value,
        pages.value,
        readed.checked
    )
    if (bookToUpdateIndex) {
        myLibrary[bookToUpdateIndex] = newBook
        bookToUpdateIndex = false
    }
    else {
        myLibrary.push(newBook)
    }
    addBookToDOM()
    toggleForm(e)
}

function addBookToDOM() {
    booksContainer.innerHTML = ''
    createBook()
    addListenersToButtons()
}

function addListenersToButtons() {
    let btnsUpdate = [...document.getElementsByClassName('btnUpdate')]
    let btnsRemove = [...document.getElementsByClassName('btnRemove')]
    btnsUpdate.forEach(b => {
        b.addEventListener('click', updateBook)
    })
    btnsRemove.forEach(b => {
        b.addEventListener('click', removeBook)
    })
}

function createBook() {
    myLibrary.forEach((book, i) => {
        booksContainer.innerHTML += `
        <div id="${i}" class="book-card">
            <p>${book.author}</p>
            <p>${book.title}</p>
            <p>${book.publisher}</p>
            <p>first published in ${book.year}</p>
            <p>${book.pages} pages</p>
            <p>${book.readed?'readed':'not yet finished'}</p>
            <div class="bookButtons">
                <button class="btnUpdate">update</button>
                <button class="btnRemove">remove</button>
            </div>
        </div>
        `
    })
}

addBookToDOM()

function toggleForm(e) {
    e.preventDefault()
    formIsVisible = !formIsVisible
    if (formIsVisible) form.style.display = 'block'
    else {
        cleanForm(e)
        form.style.display = 'none'
    }
}

function cleanForm(e) {
    // console.log(e);
    let formElements = [...e.path[2].elements]
    formElements.forEach(element => {
        if (element.name === 'readed') element.checked = false
        else element.value = ''
    })
}

function removeBook(e) {
    let bookToRemove = myLibrary[e.path[2].id]
    myLibrary = myLibrary.filter(book => book !== bookToRemove)
    addBookToDOM()
}

function updateBook(e) {
    bookToUpdateIndex = e.path[2].id
    let bookToUpdate = myLibrary[e.path[2].id]
    toggleForm(e)
    fillForm(bookToUpdate)
}

function fillForm(book) {
    title.value = book.title
    author.value = book.author
    publisher.value = book.publisher
    year.value = book.year
    pages.value = book.pages
    readed.checked = book.readed
}