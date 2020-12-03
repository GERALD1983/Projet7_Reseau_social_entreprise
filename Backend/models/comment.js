const mysql = require("mysql");
const connection = require("../ConnexionBDD/connect");

const Commentaire = function (commentaire) {
  this.comment = commentaire.comment;
  this.post_id = commentaire.post_id;
  this.user_id = commentaire.user_id;
  //this.date_cree = commentaire.date_cree;
};

Commentaire.create = (newCommentaire, result) => {
  connection.query(
    `INSERT INTO Commentaires SET ?, date_cree = NOW()`,
    // UPDATE Poster INNER JOIN Commentaires ON commentaires.post_id = poster.id SET nb_commentaires = nb_commentaires +1
    newCommentaire,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created commentaire: ", {
        id: res.insertId,
        ...newCommentaire,
      });
      result(null, { id: res.insertId, ...newCommentaire });
    }
  );
};

Commentaire.findById = (commentaireId, result) => {
  connection.query(
    `SELECT * FROM Commentaires WHERE id = ${commentaireId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found commentaires: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Commentaire with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Commentaire.getAll = (result) => {
  connection.query("SELECT * FROM Commentaires", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("commentaires: ", res);
    result(null, res);
  });
};

Commentaire.updateById = (id, commentaire, result) => {
  connection.query(
    "UPDATE Commentaires SET comment = ?, user_id = ?, date_modify = NOW() WHERE id = ?",
    [
      commentaire.comment,
      commentaire.user_id,
      //commentaire.date_cree,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Commentaire with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated commentaire: ", { id: id, ...commentaire });
      result(null, { id: id, ...commentaire });
    }
  );
};

Commentaire.remove = (id, result) => {
  connection.query("DELETE FROM Commentaires WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Commentaire with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted commentaire with id: ", id);
    result(null, res);
  });
};

Commentaire.removeAll = (result) => {
  connection.query("DELETE FROM Commentaires", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} commentaires`);
    result(null, res);
  });
};

module.exports = Commentaire;
