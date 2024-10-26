import express from 'express';
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';

const apiRouter = express.Router();

apiRouter.use('/users', userRoutes);
apiRouter.use('/thoughts', thoughtRoutes);

export default apiRouter;
