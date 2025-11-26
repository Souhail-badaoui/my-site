// src/routes/matchRoutes.js
import express from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'; 
import { createMatch, getMatches, getMatch, updateMatch, deleteMatch } from '../controllers/matchController.js'; 

const router = express.Router();

// Public Routes (No token needed)
router.get('/', getMatches);
router.get('/:id', getMatch);

// Protected Routes (Requires Admin token)
router.post('/', authenticate, authorizeAdmin, createMatch);
router.put('/:id', authenticate, authorizeAdmin, updateMatch);
router.delete('/:id', authenticate, authorizeAdmin, deleteMatch);

export default router; // <-- Exports the Express router instance