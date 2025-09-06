import Book from '../models/Book.js';


export const index = async (req, res) => {
    const books = await Book.find({ owner: req.session.user._id });
    res.locals.title = 'My Books'
    res.render('books/index', { books });
};


export const newBook = (req, res) => {
    res.locals.title = 'New Book'
    res.render('books/new');
} 


export const create = async (req, res) => {
    const { title, author, description } = req.body;
    await Book.create({ title, author, description, owner: req.session.user._id });
    res.redirect('/books');
};


export const edit = async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.locals.title = 'Edit Book'
    res.render('books/edit', { book });
};


export const update = async (req, res) => {
    const { title, author, description } = req.body;
    await Book.findByIdAndUpdate(req.params.id, { title, author, description });
    res.redirect('/books');
};


export const remove = async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
};