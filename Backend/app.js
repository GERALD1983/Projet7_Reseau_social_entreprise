const express = require("express");
const bodyParser = require("body-parser");
//const connection = require("./ConnexionBDD/connect");

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

const app = express();
console.log("salut");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);

module.exports = app;
