const dbConfig = require("../orgConfig/orgDb.config.js");

var nodemailer = require('nodemailer');

let mailer = nodemailer.createTransport({
  host: dbConfig.smtpHost,
  port: dbConfig.smtpPort,
  auth: {
    user: dbConfig.smtpUserName,
    pass: dbConfig.smtpPassword,
    // user: dbConfig.smtpUserName,
    // pass: dbConfig.smtpPassword,
  },
});

module.exports = mailer;