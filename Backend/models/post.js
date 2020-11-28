const mysql = require("mysql");
const connection = require("../ConnexionBDD/connect");

const Poste = function (poste) {
  this.titre = poste.titre;
  this.description = poste.description;
  this.image_link = poste.image_link;
  this.nb_commentaires = poste.nb_commentaires;
  this.nb_likes = poste.nb_likes;
  this.user_id = poste.user_id;
  this.date_cree = poste.date_cree;
  this.nb_dislikes = poste.nb_dislikes;
};

Poste.create = (newPoste, result) => {
  connection.query("INSERT INTO Poster SET ?", newPoste, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created poste: ", { id: res.insertId, ...newPoste });
    result(null, { id: res.insertId, ...newPoste });
  });
};

Poste.findById = (posteId, result) => {
  connection.query(`SELECT * FROM Poster WHERE id = ${posteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found poste: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Poste with the id
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

module.exports = Poste;
