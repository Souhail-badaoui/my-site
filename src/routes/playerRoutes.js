import express from 'express'
import {playerController} from "../controllers/playerController.js"

const router = express.Router();

router.get("/", playerController.getAllPlayers);

router.get("/:id", playerController.getPlayerById);

router.post("/", playerController.createPlayer);

router.put("/:id", playerController.updatePlayer);

router.delete("/:id", playerController.deletePlayer);


export default router