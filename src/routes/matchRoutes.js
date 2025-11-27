// src/routes/matchRoutes.js
import express from 'express';
const router = express.Router();
import { createMatch, getMatches, getMatch, updateMatch, deleteMatch } from '../controllers/matchController.js'; 



router.get('/', getMatches);
router.get('/:id', getMatch);

router.post('/', createMatch);
router.put('/:id',  updateMatch);
router.delete('/:id',  deleteMatch);

export default router; // <-- Exports the Express router instance
