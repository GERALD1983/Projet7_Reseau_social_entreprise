const mysql = require("mysql");
const connection = require("../ConnexionBDD/connect");

// constructor
const User = function (user) {
  this.email = user.email;
  this.mdp = user.mdp;
  this.pseudo = user.pseudo;
};
/*
exports.createUser = function createUser() {
  connection.query(
    "INSERT INTO User (email,mdp,pseudo) VALUES ('george@outlook.fr','testing','george');",
    function (error, results, fields) {
      if (error) throw error;
      console.log("create this user: ", results);
    }
  );
};

exports.updateUser = connection.query(
  "UPDATE User SET pseudo= 'maria', mdp= 'testing' WHERE email= 'marie@outlook.fr'",
  function (error, results, fields) {
    if (error) throw error;
    console.log("create this user: ", results);
  }
);

exports.deleteUser = connection.query(
  "DELETE FROM User WHERE pseudo= 'george'",
  function (error, results, fields) {
    if (error) throw error;
    console.log("create this user: ", results);
  }
);
*/
User.create = (newUser, result) => {
  connection.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  connection.query(`SELECT * FROM User WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (result) => {
  connection.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  connection.query(
    "UPDATE User SET email = ?, mdp = ?, pseudo = ? WHERE id = ?",
    [user.email, user.mdp, user.pseudo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  connection.query("DELETE FROM User WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  connection.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
