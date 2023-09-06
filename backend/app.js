require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

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

app.use(cors);
app.use(helmet());
app.use(cookieParser());

app.use(express.json());
app.use(requestLogger);
app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
