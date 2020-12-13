const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mysql = require("mysql");
const User = require("../models/users");

const db = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "gerald",
    password: "gerald",
    database: "groupomania",
  },
});

exports.signup = async (req, res) => {
  try {
    const { email, mdp } = req.body;
    if (!email || !mdp) {
      res.status(400).json(`Missing ${!email ? "email" : "mdp"}!`);
    }
    const hash = await bcrypt.hash(req.body.mdp, 10);

    await db("user").insert({
      email: req.body.email,
      mdp: hash,
      nom: req.body.nom,
      prenom: req.body.prenom,
      date_cree: new Date(),
    });

    res.status(200).json("all good");
  } catch (error) {
    if (error.errno === 19) {
      res.status(400).json("A user with that email already exists!");
    } else console.log(error);
    res.status(500).send("something broke");
  }
};

/*

// Create and Save a new User
exports.signup = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a User
  const user = new User({
    email: req.body.email,
    mdp: req.body.mdp,
    nom: req.body.nom,
    prenom: req.body.prenom,
  });
  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

*/
/*

exports.login = (req, res, next) => {
  User.findOne({
    email: maskData.maskEmail2(req.body.email, emailMaskOptions),
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
*/
exports.login = async (req, res) => {
  try {
    const { email, mdp } = req.body;

    if (!email || !mdp) {
      res.status(400).json(`Missing ${!email ? "email" : "mdp"}!`);
    }

    const user = await db("user").first("*").where({ email: email });

    if (user) {
      const validPass = await bcrypt.compare(mdp, user.mdp);
      if (validPass) {
        const token = jwt.sign({ email: email }, "superScretthing");
        res.status(200).json({ token: token });
      } else {
        res.status(401).json("Wrong password!");
      }
    } else {
      res.status(404).json("User not found!");
    }
  } catch (e) {
    // console.log(e); // Uncomment if needed for debug
    res.status(400).json("Something broke!");
  }
};

/*

// Find a single User with a userId
exports.login = (req, res) => {
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
*/

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

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
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
