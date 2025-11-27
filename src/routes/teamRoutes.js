import express from "express"
const router = express.Router();
import {teamController} from "../controllers/teamController.js"

router.get("/", teamController.getAllTeams);

router.get("/:id", teamController.getTeamById);

router.post("/", teamController.createTeam);

router.put("/:id", teamController.updateTeam);

router.delete("/:id", teamController.deleteTeam);

export default router;