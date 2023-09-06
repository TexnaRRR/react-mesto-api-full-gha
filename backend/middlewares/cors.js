const allowedCors = [
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
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Credentials', true);

  console.log('req origin', origin);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};

module.exports = cors;
