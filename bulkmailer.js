const nodemailer = require("nodemailer");
const mg = require("mailgun-js");
const config = require("./config");

exports.BulkMailer = () => {
  const mailgunAuth = {
    apiKey: config.apiKey,
    domain: config.domain,
  };
  const transport = mg(mailgunAuth);

  // const smtpTransport = nodemailer.createTransport(transport);
  // return smtpTransport;

  return transport;
};
