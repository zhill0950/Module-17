import { Router } from 'express';
import thoughtRoutes from './thoughtRoutes.js';  // Adjusted path
import userRoutes from './userRoutes.js';  // Adjusted path

const router = Router();

// Use the routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

export default router;
