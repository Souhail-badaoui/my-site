const router = require("express").Router();
const matchCtrl = require("../controllers/matchController");

router.post("/", matchCtrl.createMatch);
router.get("/", matchCtrl.getMatches);
router.get("/:id", matchCtrl.getMatch);
router.put("/:id", matchCtrl.updateMatch);
router.delete("/:id", matchCtrl.deleteMatch);

module.exports = router;
