require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const { BulkMailer } = require("./bulkmailer");

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res, next) => {
  res.send("Hello from Nodemailer");
});

app.post("/send", (req, res, next) => {
  let mail = {
    from: "Elon Mosque <elon@mosque.com>",
    to: "oluwatobilobagunloye@gmail.com", //Change to email address that you want to receive messages on
    subject: "New Message from Nodemailer!",
    text: "hello world from nodemailer",
  };

  BulkMailer()
    .messages()
    .send(mail, (err, data) => {
      console.log(err);
      if (err) {
        return res.status(400).json({
          message: "An error has occured!",
          err: err,
        });
      }
      return res.status(200).json({
        message: "Success!",
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

app.listen(process.env.PORT || 3000, () => {
  console.log("Bulk email server is now running!");
});
