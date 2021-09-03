require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const app = express();
const { BulkMailer } = require("./bulkmailer");
const config = require("./config");
const cors = require("cors");

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");
app.use(logger("dev"));
app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res, next) => {
  res.send("Hello from Nodemailer");
});

app.post("/send", (req, res, next) => {
  let mail = {
    from: "Elon Mosque <elon@mosque.com>",
    to: req.body.recipients, //Change to email address that you want to receive messages on
    subject: req.body.subject,
    text: req.body.body,
  };

  BulkMailer()
    .messages()
    .send(mail, (err, data) => {
      console.log(err.message);
      if (err) {
        return res.status(400).json({
          message:
            "⚠ An error has occured while trying to send your message(s)!",
          err: err,
        });
      }
      return res.status(200).json({
        message: "Your message has been sent! 👍",
        data,
      });
    });
});

app.get("*", (req, res) => {
  res.status(404).json("This route or page doesn't exist yet");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
});

app.listen(config.port, () => {
  console.log("Bulk email server is now running!");
});
