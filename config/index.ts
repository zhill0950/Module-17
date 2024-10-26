import express from 'express';
import thoughtRoutes from '../routes/api/thoughtRoutes';
import userRoutes from '../routes/api/userRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;
