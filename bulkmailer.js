const nodemailer = require("nodemailer");
const mg = require("mailgun-js");

exports.BulkMailer = () => {
  const mailgunAuth = {
    apiKey: process.env.apiKey,
    domain: process.env.domain,
  };
  const transport = mg(mailgunAuth);

  // const smtpTransport = nodemailer.createTransport(transport);
  // return smtpTransport;

  return transport;
};
