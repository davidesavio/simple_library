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
btnNewBook.addEventListener('click', toggleForm)
btnAdd.addEventListener('click', addBookToLibrary)
btnCancel.addEventListener('click', closeForm)


function Book(title, author, publisher, year, pages, readed) {
  this.title = title;
  this.author = author;
  this.publisher = publisher;
  this.year = year;
  this.pages = pages;
  this.readed = readed;
}

function addBookToLibrary(e) {
  e.preventDefault()
  let formElements = [...e.path[2].elements]
  let newBook = new Book()
  formElements.forEach((element) => {
    if (element.name === 'readed') newBook[element.name] = element.checked
    else newBook[element.name] = element.value
  })
  myLibrary.push(newBook)
  addBookToDOM()
  toggleForm()
}

function addBookToDOM() {
    booksContainer.innerHTML = ''
    myLibrary.forEach((book) => {
        booksContainer.innerHTML += `
        <div class="book-card">
            <p>${book.author}</p>
            <p>${book.title}</p>
            <p>${book.publisher}</p>
            <p>first published in ${book.year}</p>
            <p>${book.pages} pages</p>
            <p>${book.readed?'readed':'not yet finished'}</p>
        </div>
        `
    })
}

addBookToDOM()

function toggleForm() {
    formIsVisible = !formIsVisible
    if (formIsVisible) form.style.display = 'block'
    else form.style.display = 'none'
}

function closeForm(e) {
    e.preventDefault()
    toggleForm()
}