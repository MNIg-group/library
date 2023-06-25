let myLibrary = [];

class Book
{
    constructor(name, author, pages, status)
    {
        this.name = name
        this.author = author
        this.pages = pages
        this.status = status
    }
    deleteBook ()
    {
        console.warn("Book deleted!");
    }
}


class Novel extends Book
{
    constructor(name, author, pages, status)
    {
        super(name, author, pages, status)
    }
}

const newNovelBook = new Novel("Hope", "Mr Bean", "128");


function addBookToLibrary ()
{
    // do stuff here
}

