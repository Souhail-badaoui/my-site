
import express from 'express';
import { createMatch, getMatches, getMatch, updateMatch, deleteMatch } from '../controllers/matchController.js'; 

const router = express.Router();


router.get('/', getMatches);
router.get('/:id', getMatch);


router.post('/',  createMatch);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);

export default router; 