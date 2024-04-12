import express from 'express';
import protectedRoute from '../middleware/protectedRoute.js';
import { gerUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/", protectedRoute, gerUsers);

export default router;