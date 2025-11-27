import express from "express"
const router = express.Router();
import {playerController} from "../controllers/playerController.js"


router.get("/", playerController.getAllPlayers);

router.get("/:id", playerController.getPlayerById);

router.post("/", playerController.createPlayer);

router.put("/:id", playerController.updatePlayer);

router.delete("/:id", playerController.deletePlayer);

export default router;