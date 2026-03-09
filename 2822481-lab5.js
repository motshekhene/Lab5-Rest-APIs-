const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];


app.get('/whoami', (req, res) => {
    res.status(200).json({ studentNumber: "2822481" });
});


app.get('/books', (req, res) => res.json(books));


app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});


app.post('/books', (req, res) => {
    const { id, title, details } = req.body;
    if (!id || !title || !details || !Array.isArray(details)) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    for (const d of details) {
        if (!d.id || !d.author || !d.genre || !d.publicationYear) {
            return res.status(400).json({ error: "Missing required fields in details" });
        }
    }
    const newBook = { id, title, details };
    books.push(newBook);
    res.status(201).json(newBook);
});


app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const { id, title, details } = req.body;
    if (id) book.id = id;
    if (title) book.title = title;
    if (details) book.details = details;

    res.json(book);
});


app.delete('/books/:id', (req, res) => {
    const book_index = books.findIndex(b => b.id === req.params.id);
    if (book_index === -1) return res.status(404).json({ error: "Book not found" });
    books.splice(book_index, 1);
    res.status(200).json({ message: "Book deleted successfully" });
});


app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const { id, author, genre, publicationYear } = req.body;
    if (!id || !author || !genre || !publicationYear) {
        return res.status(400).json({ error: "Missing required fields in detail" });
    }

    book.details.push({ id, author, genre, publicationYear });
    res.status(201).json(book);
});


app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book or detail not found" });

    const detail_index = book.details.findIndex(d => d.id === req.params.detailId);
    if (detail_index === -1) return res.status(404).json({ error: "Book or detail not found" });

    book.details.splice(detail_index, 1);
    res.status(200).json(book);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));