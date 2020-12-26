const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mysql = require("mysql");

const db = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "gerald",
    password: "gerald",
    database: "groupomania",
  },
});

// signup

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

// login

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
        const token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        });
        res.status(200).json({ userId: user.id, token: token });
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
//
