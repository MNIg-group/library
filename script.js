const newBook = document.getElementById('newBook');
const formContainer = document.getElementById('formContainer');
const form = document.querySelector('form');
const removeAll = document.getElementById('deleteBtn');
const tbody = document.querySelector('tbody');


newBook.addEventListener('click', () =>
{
    formContainer.classList.toggle('hidden');
});

// Remove All Collection Button ...................
removeAll.addEventListener('click', () =>
{
    const books = Store.getBooks();

    for (let i = 0; i < books.length; i++)
    {
        console.dir(books[ i ].title);
        Store.removeBook(books[ i ].title);
    }
})

// Store class
class Store
{
    static getBooks ()
    {
        let books = JSON.parse(localStorage.getItem('books'));
        return books ? books : [];
    }

    static addBook (book)
    {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook (title)
    {
        const books = Store.getBooks();
        const updatedBooks = books.filter(book => book.title !== title);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
    }
}

// Book class
class Book
{
    constructor(title, author, pages, stat)
    {
        this.title = title
        this.author = author
        this.pages = pages
        this.stat = stat
    }
}

class Library
{
    static displayBooks ()
    {
        const books = Store.getBooks();

        books.forEach((book) => Library.addBookToList(book));
    }

    static addBookToList (book)
    {
        const list = document.querySelector('tbody');

        const row = document.createElement('tr');

        list.appendChild(row);
        // Title of the book
        const bookTitle = document.createElement('td');
        bookTitle.textContent = `${ book.title }`;
        row.appendChild(bookTitle);
        // Author of the Book
        const bookAuthor = document.createElement('td');
        bookAuthor.textContent = `${ book.author }`;
        row.appendChild(bookAuthor);
        // The Pages contained in the Book
        const bookPages = document.createElement('td');
        bookPages.textContent = `${ book.pages }`;
        row.appendChild(bookPages);
        // Book status (read / unread)
        const bookStat = document.createElement('td');
        const statSymbol = document.createElement('i');
        if (book.stat === false)
        {
            statSymbol.classList.add('fa-solid', 'fa-xmark', 'no');
        } else
        {
            statSymbol.classList.add('fa-solid', 'fa-check', 'yes');
        }
        bookStat.appendChild(statSymbol);
        row.appendChild(bookStat);
        // Button for removing one book into library's stock
        const bookDelete = document.createElement('td');
        bookDelete.innerHTML = `<button id="deleted" onclick="removeRow(this)" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <title>trash-can-outline</title>
                                    <path
                                    fill="orangered"
                                        d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                                </svg></button>`;
        row.appendChild(bookDelete);
    }

    static clearFields ()
    {
        document.querySelector('form').reset();
    }
}

document.addEventListener('DOMContentLoaded', Library.displayBooks);

// AddNewBook with help of form input 
document.querySelector('form').addEventListener('submit', (e) =>
{
    e.preventDefault();
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let stat = document.querySelector('#read').checked === true ? true : false;

    const book = new Book(title, author, pages, stat);
    Library.addBookToList(book);
    Store.addBook(book);
    Library.clearFields();
});


function removeRow (e)
{
    // remove one row of the table


    console.log(e.target)
    // Store.removeBook(title);
}

// ........................... Default Books ....................................................................... 

const book1 = new Book("Clean Code: A Handbook of Agile Software Craftsmanship", "by Robert C. Martin", "464", true);
const book2 = new Book("The Pragmatic Programmer: Your Journey to Mastery", "by Andrew Hunt and David Thomas", "352", false);
const book3 = new Book("Design Patterns: Elements of Reusable Object-Oriented Software", "by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides", "416", false);
const book4 = new Book("Code Complete: A Practical Handbook of Software Construction", "by Steve McConnell", "960", true);

Store.addBook(book1);
Store.addBook(book2);
Store.addBook(book3);
Store.addBook(book4);