const path = require('path');
const nodemailer = require('nodemailer');

const hbs = require('nodemailer-express-handlebars');
// const mailConfig = require('../config/mail'); es5

const {
  host, port, user, pass,
} = require('../config/mail');
// es6 desestruturaçao

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

transport.use(
  'compile',
  hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
  }),
);

module.exports = transport;
