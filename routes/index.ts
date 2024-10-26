import express from 'express';
import userRoutes from './api/userRoutes';
import thoughtRoutes from './api/thoughtRoutes';

const apiRouter = express.Router();

apiRouter.use('/api/users', userRoutes);
apiRouter.use('/api/thoughts', thoughtRoutes);

export default apiRouter;
