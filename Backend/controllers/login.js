const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mysql = require("mysql");
const maskData = require("maskdata");

// methode masquage email
const emailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 2,
  unmaskedEndCharactersAfterAt: 1,
  maskAtTheRate: false,
};

// module knex pour faire faire des requetes sql asynchrone
const db = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
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
      email: maskData.maskEmail2(req.body.email, emailMaskOptions),
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
    const email = maskData.maskEmail2(req.body.email, emailMaskOptions);
    const mdp = req.body.mdp;

    if (!email || !mdp) {
      res.status(400).json(`Missing ${!email ? "email" : "mdp"}!`);
    }

    const user = await db("user").first("*").where({ email: email });

    if (user) {
      const validPass = await bcrypt.compare(mdp, user.mdp);
      if (validPass) {
        const token = jwt.sign({ userId: user.id }, process.env.TOKENSECRET, {
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
