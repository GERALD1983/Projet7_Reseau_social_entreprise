// variable du modele du mot de passe
const passSchema = require("../models/password");

// logique du modele utiliser pour valider le mot de passe

module.exports = (req, res, next) => {
  if (!passSchema.validate(req.body.mdp)) {
    return res.status(400).json({
      error:
        "mot de passe pas assez fort ! au moins une minuscule et majuscule 8 caracter min et 30 max 1 chiffre min pas d'espace" +
        passSchema.validate("retente ta chance", { list: true }),
    });
  } else {
    next();
  }
};
