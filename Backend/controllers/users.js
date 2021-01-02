const mysql = require("mysql");
const User = require("../models/users");
const fs = require("fs");

// Find a single User with a userId
exports.findUser = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.updateUser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    ville: req.body.ville,
    image_url: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
  });

  //save user

  User.updateById(req.params.userId, user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Delete a User with the specified userId in the request
exports.deleteUser = (req, res) => {
  User.findById(req.params.userId, (err, user, data) => {
    const filename = user.image_url.split("/images/")[1];
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId,
        });
      }
    } else {
      fs.unlink(`images/${filename}`, () => {
        User.remove(req.params.userId, (err, data) => {
          res.send({ message: `User was deleted successfully!` });
        });
      });
    }
  });
};

// Delete all Users from the database.
exports.deleteAllUsers = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};

// Code commenter ensuite test que je garde en reserve
/*
exports.deleteUser = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
*/
