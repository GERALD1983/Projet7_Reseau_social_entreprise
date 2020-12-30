const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "groupomania",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
connection.query("SELECT * FROM User", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results);
});
connection.query("SELECT * FROM Poster", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results);
});

module.exports = connection;
