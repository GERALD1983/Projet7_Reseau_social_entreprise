const mysql = require("mysql");
const connection = require("../ConnexionBDD/connect");

const Poste = function (poste) {
  this.titre = poste.titre;
  this.description = poste.description;
  this.image_link = poste.image_link;
  this.nb_commentaires = poste.nb_commentaires;
  this.nb_likes = poste.nb_likes;
  this.user_id = poste.user_id;
  this.nb_dislikes = poste.nb_dislikes;
  //this.date_cree = poste.date_cree;
};

Poste.create = (newPoste, result) => {
  connection.query(
    `INSERT INTO Poster SET ?, date_cree = NOW()`,
    newPoste,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created poste: ", { id: res.insertId, ...newPoste });
      result(null, { id: res.insertId, ...newPoste });
    }
  );
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

Poste.getAll = (result) => {
  connection.query(
    "SELECT id , titre, description, image_link, user_id, date_cree, CONCAT_WS(' ', DAY(date_cree),'/',MONTH(date_cree),'/', YEAR(date_cree) , ' à: ', TIME(date_cree)) AS jolie_date FROM Poster",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("postes: ", res);
      result(null, res);
    }
  );
};

Poste.updateById = (id, poste, result) => {
  connection.query(
    "UPDATE Poster SET titre = ?, description = ?, image_link = ?, date_modify = NOW() WHERE id = ?",
    [
      poste.titre,
      poste.description,
      poste.image_link,
      //poste.user_id,
      //poste.date_cree,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Poste with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated poste: ", { id: id, ...poste });
      result(null, { id: id, ...poste });
    }
  );
};

Poste.remove = (id, result) => {
  connection.query("DELETE FROM Poster WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Poste with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted poste with id: ", id);
    result(null, res);
  });
};

Poste.removeAll = (result) => {
  connection.query("DELETE FROM Poster", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} postes`);
    result(null, res);
  });
};

Poste.likeById = (id, poste, result) => {
  connection.query(
    "UPDATE Poster SET  nb_likes = ?, WHERE id = ?",
    [
      poste.nb_likes,
      //poste.date_cree,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Poste with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated poste: ", { id: id, ...poste });
      result(null, { id: id, ...poste });
    }
  );
};

Poste.dislikeById = (id, poste, result) => {
  connection.query(
    "UPDATE Poster SET  nb_dislikes = ?, WHERE id = ?",
    [
      poste.nb_dislikes,
      //poste.date_cree,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Poste with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated poste: ", { id: id, ...poste });
      result(null, { id: id, ...poste });
    }
  );
};

module.exports = Poste;
