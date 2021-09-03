const express = require("express");
const app = express();
const logger = require("morgan");
const http = require("http");

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res, next) => {
  res.send("hello world!");
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

app.listen(1017, () => {
  console.log("Bulk email server is now running!");
});
