const express = require("express");
const router = express.Router();

// creation des routes de post des utilisateurs modif get et supprimer post

router.post("", auth, multer, saucesCtrl.createSauce);
router.get("", auth, saucesCtrl.getAllSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauce);

module.exports = router;
