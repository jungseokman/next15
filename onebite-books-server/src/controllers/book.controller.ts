import { Router } from 'express';
import { BookService } from '../services/book.service';

const router = Router();
const bookService = new BookService();

router.get('/', async (req, res) => {
  const books = await bookService.findAllBooks();
  res.json(books);
});

router.get('/search', async (req, res) => {
  const query = req.query.q as string;
  const books = await bookService.searchBooks(query);
  res.json(books);
});

router.get('/random', async (req, res) => {
  const books = await bookService.findRandomBooks();
  res.json(books);
});

router.get('/:bookId', async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    const book = await bookService.findOneBook(bookId);
    res.json(book);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/', async (req, res) => {
  const newBook = await bookService.createBook(req.body);
  res.status(201).json(newBook);
});

router.patch('/:bookId', async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    const updatedBook = await bookService.updateBook(bookId, req.body);
    res.json(updatedBook);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete('/:bookId', async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    await bookService.removeBook(bookId);
    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
