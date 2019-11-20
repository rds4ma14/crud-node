const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }

  // Bearer as768fd68ads67890d9g0ajf0akdodasohiua!@#sja

  const parts = authHeader.split(' ');
  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  //   '/^' começa o regex '$' finaliza o token 'i' caseSensitive
  // Bearer começo padrao do jsonwebtoken

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid!!!' });
    req.userId = decoded.id;
    return next();
  });
};
