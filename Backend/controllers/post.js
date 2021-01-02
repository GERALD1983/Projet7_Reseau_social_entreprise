const mysql = require("mysql");
const Poste = require("../models/post");
const fs = require("fs");

// Create and Save a new Poste
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Poste
  const poste = new Poste({
    titre: req.body.titre,
    description: req.body.description,
    image_link: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : "",
    nb_commentaires: req.body.nb_commentaires,
    nb_likes: req.body.nb_likes,
    nb_dislikes: req.body.nb_dislikes,
    user_id: req.body.user_id,
    date_cree: new Date(),
  });

  // Save Poste in the database
  Poste.create(poste, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Poste.",
      });
    else res.send(data);
  });
};

// Retrieve all Postes from the database.
exports.findAll = (req, res) => {
  Poste.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving postes.",
      });
    else res.send(data);
  });
};

// Find a single Poste with a posteId
exports.findOne = (req, res) => {
  Poste.findById(req.params.posteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Poste with id ${req.params.posteId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Poste with id " + req.params.posteId,
        });
      }
    } else res.send(data);
  });
};

// Update a Poste identified by the posteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Poste.updateById(req.params.posteId, new Poste(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Poste with id ${req.params.posteId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Poste with id " + req.params.posteId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Poste with the specified posteId in the request
exports.delete = (req, res) => {
  Poste.findById(req.params.posteId, (err, poste, data) => {
    const filename = poste.image_link.split("/images/")[1];
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Poste with id ${req.params.posteId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Poste with id " + req.params.posteId,
        });
      }
    } else {
      fs.unlink(`images/${filename}`, () => {
        Poste.remove(req.params.posteId, (err, data) => {
          res.send({ message: `Poste was deleted successfully!` });
        });
      });
    }
  });
};

// Delete all Postes from the database.
exports.deleteAll = (req, res) => {
  Poste.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all postes.",
      });
    else res.send({ message: `All Postes were deleted successfully!` });
  });
};

// Code commenter ancien test que je garde en reserve

//const fileUpload = require("express-fileupload");
/*
const db = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "gerald",
    password: "gerald",
    database: "groupomania",
  },
});

exports.create = async (req, res) => {
  const postObject = JSON.parse(req.body);
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    // const hash = await bcrypt.hash(req.body.mdp, 10);
    const poste = {
      ...postObject,
     
      titre: req.body.titre,
      description: req.body.description,
      image_link: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
     
      nb_commentaires: req.body.nb_commentaires,
      nb_likes: req.body.nb_likes,
      nb_dislikes: req.body.nb_dislikes,
      user_id: req.body.user_id,
      date_cree: new Date(),
    };

    await db("poster").insert({
      poste,
    });
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    // Use the mv() method to place the file somewhere on your server

    res.status(200).json("all good");
  } catch (error) {
    if (error.errno === 19) {
      res.status(400).json("Some error occurred while creating the Poste.");
    } else console.log(error);
    res.status(500).send("something broke");
  }
};
*/
