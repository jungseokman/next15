import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import bookRouter from './controllers/book.controller';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/books', bookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
