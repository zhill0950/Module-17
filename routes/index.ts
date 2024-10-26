import { Router } from 'express';
import thoughtRoutes from './api/thoughtRoutes.js';
import userRoutes from './api/userRoutes.js';

const router = Router();

// Use the routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

export default router;
