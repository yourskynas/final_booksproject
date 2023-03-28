let count = 0
let books = [
  {
    id: count++,
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    authors: 'Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm',
    year: '1994',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg'
  },
  {
    id: count++,
    title: 'JavaScript: The Good Parts',
    authors: 'Douglas Crockford',
    year: '2008',
    image: 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg'
  },
  {
    id: count++,
    title:
      'JavaScript Patterns: Build Better Applications with Coding and Design Patterns',
    authors: 'Stoyan Stefanov',
    year: 2008,
    image:
      'https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg'
  },
  {
    id: count++,
    title:
      'JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)',
    authors: 'David Flanagan',
    year: 2011,
    image:
      'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg'
  }
]

const container = document.getElementById("container")
const displayOnOff = document.getElementById("displayOnOff")
const displayUpdate = document.getElementById("updateModal")
const closeModalButton = document.getElementById("closeModal")

closeModalButton.addEventListener("click", function () {
  displayUpdate.classList.toggle("u-d-n")
})

const updateBookButton = document.getElementById('updateBookButton')
updateBookButton.addEventListener('click', updateBook)

let currentBook = null

function updateBook() {
  const bookIndex = books.indexOf(currentBook)

  const nameBook = document.getElementById("nameBookUpdate").value
  const authorBook = document.getElementById("authorBookUpdate").value
  const yearBook = document.getElementById("yearBookUpdate").value
  const hrefImgBook = document.getElementById("hrefImgBookUpdate").value

  const book = {
    id: count++,
    title: nameBook,
    authors: authorBook,
    year: yearBook,
    image: hrefImgBook
  }

		
  books.splice(bookIndex, 1, book)
  renderBook()

  const booksJson = JSON.stringify(books)
  localStorage.setItem("books", booksJson)

  displayUpdate.classList.toggle("u-d-n")
}

function openUpdateModal(bookId) {
  displayUpdate.classList.toggle("u-d-n")

  const book = books.find(book => {
    return book.id === bookId
  })
  currentBook = book

  document.getElementById("nameBookUpdate").value = book.title
  document.getElementById("authorBookUpdate").value = book.authors
  document.getElementById("yearBookUpdate").value = book.year
  document.getElementById("hrefImgBookUpdate").value = book.image
}

const addBooks = document.getElementById("addBook-button")

// let isOpen = false
function addBook() {
  displayOnOff.classList.toggle("u-d-n") //2 ШАГ-ДОБАВИЛА ПЕРЕКЛЮЧАТЕЛЬ ТОГЛ, НО ПРИ СОХРАНЕНИИ КНИГИ КНОПКА "ДОБАВИТЬ КНИГУ"
  //УЖЕ НЕ НАЖИМАЛАСЬ, ВСЕ ДЕЛО В САМОМ СОХРАНЕНИИ
  //1 ШАГ-СНАЧАЛА Я УБРАЛА ЭТО: if (isOpen) {
  //   displayOnOff.style.display = "none"
  //   isOpen = false
  // } else {
  //   displayOnOff.style.display = "flex"
  //   isOpen = true
  // }
}

addBooks.addEventListener("click", addBook)

function renderBook() {
  container.innerHTML = ""
  books.forEach((book) => {
    container.innerHTML += `
      <div class="book">
        <div class="book-item">

          <div class="book-top">
            <img class="book-img" src= "${book.image}"/>
            <h2>${book.title}</h2>
          </div>

          <div class="book-in-top">
            <div><p>${book.year}</p></div>
            <div><h3>${book.authors}</h3></div>
          </div>
          
        </div>

            
        <div class="book-bottom">
          <div><button onclick="openUpdateModal(${book.id})">Изменить</button></div>
          <div class="book-bottom-rightBorder"></div>
          <div><button onclick="deleteBook(${book.id})">Удалить</button></div>
        </div>
            
            
      </div>
    `
  })
}

function deleteBook(id) {
  const book = books.find((b) => {
    return b.id === id
  })
  const bookIndex = books.indexOf(book)
  books.splice(bookIndex, 1)
  renderBook()

  const booksJson = JSON.stringify(books)
  localStorage.setItem("books", booksJson)
}

function clearForm() {
  document.getElementById("nameBook").value = ""
  document.getElementById("authorBook").value = ""
  document.getElementById("yearBook").value = ""
  document.getElementById("hrefImgBook").value = ""
}

const safeBooks = document.getElementById ("safe-book")

function safeBook() {
  const nameBook = document.getElementById("nameBook").value
  const authorBook = document.getElementById("authorBook").value
  const yearBook = document.getElementById("yearBook").value
  const hrefImgBook = document.getElementById("hrefImgBook").value

  const book = {
    id: count++,
    title: nameBook,
    authors: authorBook,
    year: yearBook,
    image: hrefImgBook
  }

  books.push(book)
  renderBook()
  clearForm()

  const booksJson = JSON.stringify(books)
  localStorage.setItem("books", booksJson)

  // displayOnOff.style.display = "none" //ШАГ 3-Я ЗАКОММЕНТИЛА ЭТУ СТРОКУ, ИЗ-ЗА НЕЁ НЕ НАЖИМАЛАСЬ КНОПКА "ДОБАВИТЬ КНИГУ" ПОСЛЕ СОХРАНЕНИЯ НОВОЙ

  displayOnOff.classList.toggle("u-d-n") // ШАГ3 УРА! ВСЕ ЗАРАБОТАЛО, Я МОЛОДЕЦ
}

safeBooks.addEventListener("click", safeBook)

const closeBooks = document.getElementById ("close-book")
closeBooks.addEventListener("click", closeBook)
function closeBook() {
  displayOnOff.classList.toggle("u-d-n")
}

const booksJson = localStorage.getItem("books")
const savedBooks = JSON.parse(booksJson)
if (booksJson) {
  books = savedBooks
}

renderBook()