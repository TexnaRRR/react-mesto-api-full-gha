require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const { DB_HOST = 'localhost' } = process.env;
const { DB_PORT = '27017' } = process.env;
const app = express();

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/mestodb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(cors({
  origin: [
    'localhost:3000',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'https://mesto-yandex.nomoredomains.rocks',
    'https://api.mesto-yandex.nomoredomains.rocks',
    'http://mesto-yandex.nomoredomains.rocks',
    'http://api.mesto-yandex.nomoredomains.rocks',
    'http://api.mesto-yandex.nomoredomainsicu.ru',
    'https://api.mesto-yandex.nomoredomainsicu.ru',
    'https://alex.students.nomoredomainsicu.ru',
    'http://alex.students.nomoredomainsicu.ru',
  ],
  credentials: true,
}));
app.use(helmet());
app.use(cookieParser());

app.use(express.json());
app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
