const mysql = require("mysql");
const connection = require("../ConnexionBDD/connect");

const Like = function (like) {
  this.post_id = like.post_id;
  this.user_id = like.user_id;
  //this.date_cree = poste.date_cree;
};

const Unlike = function (unlike) {
  this.post_id = like.post_id;
  this.user_id = like.user_id;
  //this.date_cree = poste.date_cree;
};

Like.create = (newLike, result) => {
  connection.query(`INSERT INTO Users_likes SET ?`, newLike, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created poste: ", { id: res.insertId, ...newLike });
    result(null, { id: res.insertId, ...newLike });
  });
};

Unlike.create = (newUnlike, result) => {
  connection.query(
    `INSERT INTO Users_dislikes SET ?`,
    newUnlike,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created poste: ", { id: res.insertId, ...newUnlike });
      result(null, { id: res.insertId, ...newUnlike });
    }
  );
};

Like.remove = (id, result) => {
  connection.query("DELETE FROM Users_likes WHERE id = ?", id, (err, res) => {
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

    console.log("deleted like with id: ", id);
    result(null, res);
  });
};

Unlike.remove = (id, result) => {
  connection.query(
    "DELETE FROM Users_dislikes WHERE id = ?",
    id,
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

      console.log("deleted Unlike with id: ", id);
      result(null, res);
    }
  );
};
